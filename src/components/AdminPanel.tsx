import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  Calendar, 
  Tag, 
  FileText,
  Users,
  Settings
} from 'lucide-react';
import { regulationService } from '../services/regulationService';
import { authService } from '../services/authService';
import { Regulation, User } from '../types';
import { toast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

export const AdminPanel: React.FC = () => {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    keywords: '',
    effectiveDate: '',
    version: '',
    source: '',
    exceptions: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRegulations(regulationService.getAllRegulations());
    setUsers(authService.getAllUsers());
  };

  const handleCreateNew = () => {
    setSelectedRegulation(null);
    setFormData({
      title: '',
      category: '',
      content: '',
      keywords: '',
      effectiveDate: new Date().toISOString().split('T')[0],
      version: 'v1.0',
      source: '',
      exceptions: ''
    });
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleEdit = (regulation: Regulation) => {
    setSelectedRegulation(regulation);
    setFormData({
      title: regulation.title,
      category: regulation.category,
      content: regulation.content,
      keywords: regulation.keywords.join(', '),
      effectiveDate: regulation.effectiveDate,
      version: regulation.version,
      source: regulation.source,
      exceptions: regulation.exceptions.join('\n')
    });
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "오류",
        description: "제목과 내용은 필수 입력 항목입니다.",
        variant: "destructive",
      });
      return;
    }

    const regulationData = {
      title: formData.title,
      category: formData.category || '기타',
      content: formData.content,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
      effectiveDate: formData.effectiveDate,
      version: formData.version,
      source: formData.source,
      nextSteps: [], // Can be extended later
      exceptions: formData.exceptions.split('\n').map(e => e.trim()).filter(e => e)
    };

    try {
      if (selectedRegulation) {
        // Update existing
        regulationService.updateRegulation(selectedRegulation.id, regulationData);
        toast({
          title: "성공",
          description: "규정이 수정되었습니다.",
        });
      } else {
        // Create new
        regulationService.addRegulation(regulationData);
        toast({
          title: "성공",
          description: "새 규정이 추가되었습니다.",
        });
      }
      
      setIsEditing(false);
      loadData();
    } catch (error) {
      toast({
        title: "오류",
        description: "저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 이 규정을 삭제하시겠습니까?')) {
      regulationService.deleteRegulation(id);
      toast({
        title: "성공",
        description: "규정이 삭제되었습니다.",
      });
      loadData();
      setSelectedRegulation(null);
      setIsEditing(false);
    }
  };

  const renderRegulationList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">규정 목록 ({regulations.length}개)</h3>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          새 규정 추가
        </Button>
      </div>
      
      <div className="grid gap-4">
        {regulations.map((regulation) => (
          <Card key={regulation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{regulation.title}</h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{regulation.category}</Badge>
                    <span className="text-sm text-gray-500">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {regulation.effectiveDate}
                    </span>
                    <span className="text-sm text-gray-500">{regulation.version}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {regulation.keywords.slice(0, 3).map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {regulation.keywords.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{regulation.keywords.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(regulation)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(regulation.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {selectedRegulation ? '규정 수정' : '새 규정 추가'}
        </h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? '편집' : '미리보기'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            저장
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            취소
          </Button>
        </div>
      </div>

      {showPreview ? (
        <Card>
          <CardHeader>
            <CardTitle>{formData.title || '제목 없음'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <ReactMarkdown>{formData.content}</ReactMarkdown>
            </div>
            {formData.exceptions && (
              <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                <AlertDescription>
                  <strong>예외사항:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {formData.exceptions.split('\n').map((exception, index) => (
                      <li key={index}>{exception}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="규정 제목을 입력하세요"
              />
            </div>
            
            <div>
              <Label htmlFor="category">카테고리</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="예: 휴가, 경비, 근무"
              />
            </div>
            
            <div>
              <Label htmlFor="keywords">키워드 (쉼표로 구분)</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                placeholder="연차, 휴가, annual leave"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="effectiveDate">시행일</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="version">버전</Label>
                <Input
                  id="version"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="v1.0"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="source">출처</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                placeholder="예: 인사규정 제15조"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">내용 * (마크다운 지원)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="## 제목&#10;&#10;### 소제목&#10;- 항목 1&#10;- 항목 2"
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="exceptions">예외사항 (줄바꿈으로 구분)</Label>
              <Textarea
                id="exceptions"
                value={formData.exceptions}
                onChange={(e) => setFormData({...formData, exceptions: e.target.value})}
                placeholder="예외사항 1&#10;예외사항 2"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">사용자 관리 ({users.length}명)</h3>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{user.username}</h4>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role === 'admin' ? '관리자' : '일반사용자'}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  ID: {user.id}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">관리자 패널</h2>
        <p className="text-gray-600">사내 규정과 사용자를 관리할 수 있습니다.</p>
      </div>

      <Tabs defaultValue="regulations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="regulations" className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            규정 관리
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            사용자 관리
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            설정
          </TabsTrigger>
        </TabsList>

        <TabsContent value="regulations" className="mt-6">
          {isEditing ? renderEditor() : renderRegulationList()}
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          {renderUserManagement()}
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>시스템 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    현재 시스템은 로컬 스토리지를 사용하여 데이터를 저장합니다. 
                    실제 운영 환경에서는 데이터베이스 연동을 권장합니다.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>총 규정 수:</strong> {regulations.length}개
                  </div>
                  <div>
                    <strong>총 사용자 수:</strong> {users.length}명
                  </div>
                  <div>
                    <strong>카테고리 수:</strong> {regulationService.getCategories().length}개
                  </div>
                  <div>
                    <strong>마지막 업데이트:</strong> {new Date().toLocaleDateString('ko-KR')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};