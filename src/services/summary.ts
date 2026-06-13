import Anthropic from '@anthropic-ai/sdk';

export async function generateSummary(
  article: {
    title: string;
    body: string;
  },
  apiKey: string
): Promise<string[]> {
  const client = new Anthropic({ apiKey });

  const prompt = `당신은 인스타그램 카드뉴스 작성 전문가입니다.

주어진 기사를 정확히 5개의 카드로 표현해주세요. 각 줄은 30자 이내로 작성하세요.

**기사 정보:**
제목: ${article.title}
본문: ${article.body.substring(0, 500)}

**응답 형식 (중요):**
각 줄을 다음과 같이 작성하세요:
1. 첫 번째 카드 (제목/요약)
2. 두 번째 카드 (주요 내용)
3. 세 번째 카드 (추가 정보)
4. 네 번째 카드 (결론/의견)
5. 다섯 번째 카드 (마무리)

**제약사항:**
- 한국어로 작성
- 각 줄은 정확히 30자 이내
- 숫자나 마크다운 형식 제외
- 명확하고 간결한 문체`;

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const text =
    message.content[0].type === 'text' ? message.content[0].text : '';

  const lines = text
    .split('\n')
    .filter((line: string) => line.trim().length > 0)
    .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
    .slice(0, 5);

  while (lines.length < 5) {
    lines.push('');
  }

  return lines.slice(0, 5);
}
