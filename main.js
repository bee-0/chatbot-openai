const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendButton = document.querySelector('.chatbot-send-button');

    async function getAIResponse(prompt) {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.5,
          model: 'davinci-codex',
          stop: ['\n']
        })
      });
      const data = await response.json();
      return data.choices[0].text.trim();
    }

    function addChatbotMessage(message) {
      const chatbotMessage = document.createElement('div');
      chatbotMessage.classList.add('chatbot-message');
      chatbotMessage.innerHTML = message;
      chatbotMessages.appendChild(chatbotMessage);
    }

    function addUserMessage(message) {
      const userMessage = document.createElement('div');
      userMessage.classList.add('user-message');
      userMessage.innerHTML = message;
      chatbotMessages.appendChild(userMessage);
    }

    chatbotInput.addEventListener('keydown', async function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        const userInput = chatbotInput.value;
        addUserMessage(userInput);
        chatbotInput.value = '';
        const aiResponse = await getAIResponse(userInput);
        addChatbotMessage(aiResponse);
      }
    });

    chatbotSendButton.addEventListener('click', async function() {
      const userInput = chatbotInput.value;
      addUserMessage(userInput);
      chatbotInput.value = '';
      const aiResponse = await getAIResponse(userInput);
      addChatbotMessage(aiResponse);
    });
