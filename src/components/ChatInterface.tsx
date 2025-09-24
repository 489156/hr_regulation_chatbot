import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Search, Send, ExternalLink, AlertTriangle, FileText, Calendar, Tag } from 'lucide-react';
import { regulationService } from '../services/regulationService';
import { SearchResult, Regulation } from '../types';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  searchResults?: SearchResult[];
  regulation?: Regulation;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: '안녕하세요! 사내 규정 Q&A 챗봇입니다. 궁금한 규정이나 정책에 대해 질문해주세요.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Perform search
      const searchResults = regulationService.search(query);

      if (searchResults.length === 0) {
        // No results found
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `"${query}"에 대한 검색 결과를 찾을 수 없습니다. 다른 키워드로 검색해보시거나 관리자에게 문의해주세요.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Found results - show the best match
        const bestMatch = searchResults[0];
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `"${query}"에 대한 검색 결과입니다:`,
          timestamp: new Date(),
          searchResults,
          regulation: bestMatch.regulation
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: '검색 중 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      handleSearch(inputValue);
      setInputValue('');
    }
  };

  const renderRegulationResponse = (regulation: Regulation) => {
    return (
      <div className="space-y-4 mt-4">
        {/* 1. Conclusion */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2">📋 결론</h4>
          <div className="text-blue-800">
            <ReactMarkdown className="prose prose-sm max-w-none">
              {regulation.content.split('\n').slice(0, 3).join('\n')}
            </ReactMarkdown>
          </div>
        </div>

        {/* 2. Key Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            주요 내용 및 절차
          </h4>
          <div className="prose prose-sm max-w-none text-gray-700">
            <ReactMarkdown>{regulation.content}</ReactMarkdown>
          </div>
        </div>

        {/* 3. Source Information */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            출처 및 버전 정보
          </h4>
          <div className="space-y-2 text-sm text-green-800">
            <div className="flex items-center space-x-4">
              <span><strong>출처:</strong> {regulation.source}</span>
              <span><strong>버전:</strong> {regulation.version}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span><strong>시행일:</strong> {regulation.effectiveDate}</span>
            </div>
          </div>
        </div>

        {/* 4. Next Steps */}
        {regulation.nextSteps && regulation.nextSteps.length > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">🔗 다음 단계</h4>
            <div className="space-y-2">
              {regulation.nextSteps.map((step, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="mr-2 mb-2"
                  onClick={() => {
                    if (step.url.startsWith('http')) {
                      window.open(step.url, '_blank');
                    } else {
                      // Handle internal links
                      alert(`${step.title} 기능은 실제 시스템에서 구현됩니다.`);
                    }
                  }}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {step.title}
                  {step.type === 'payment' && ' 💳'}
                  {step.type === 'form' && ' 📝'}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 5. Exceptions/Cautions */}
        {regulation.exceptions && regulation.exceptions.length > 0 && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong className="block mb-2">⚠️ 예외사항 및 주의사항</strong>
              <ul className="list-disc list-inside space-y-1">
                {regulation.exceptions.map((exception, index) => (
                  <li key={index} className="text-sm">{exception}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              
              {/* Show regulation details for bot messages */}
              {message.type === 'bot' && message.regulation && (
                renderRegulationResponse(message.regulation)
              )}

              {/* Show additional search results */}
              {message.type === 'bot' && message.searchResults && message.searchResults.length > 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-semibold text-gray-700 mb-2">관련 규정:</h5>
                  <div className="space-y-2">
                    {message.searchResults.slice(1, 4).map((result, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                        <div className="font-medium">{result.regulation.title}</div>
                        <div className="text-gray-600 flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {result.regulation.category}
                          </Badge>
                          <span>매칭도: {Math.round(result.score)}점</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString('ko-KR')}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-600">검색 중...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="규정에 대해 질문하세요... (예: 연차 휴가, 출장비, 재택근무)"
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        
        <div className="mt-2 text-xs text-gray-500">
          💡 팁: "연차는 몇 일인가요?", "출장비 신청 방법", "재택근무 조건" 등으로 질문해보세요.
        </div>
      </div>
    </div>
  );
};