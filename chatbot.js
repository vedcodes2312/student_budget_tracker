const chatbotBtn = document.getElementById('chatbot-btn');
const chatbox = document.getElementById('chatbox');
const messages = document.getElementById('messages');
const input = document.getElementById('input');

chatbotBtn.addEventListener('click', () => {
  chatbox.style.display = chatbox.style.display === 'flex' ? 'none' : 'flex';
});

async function sendMessage() {
  const text = input.value;
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  try {
    const response = await fetch(
      `https://dialogflow.googleapis.com/v2/projects/YOUR_DIALOGFLOW_PROJECT_ID/agent/sessions/123456789:detectIntent`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer AIzaSyB-iqKMYnKRCqBTKCyKC3sgpwDYVLkQwtg',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          queryInput: {
            text: {
              text: text,
              languageCode: 'en-US'
            }
          }
        })
      }
    );

    const data = await response.json();
    const botReply = data.queryResult?.fulfillmentText || "Sorry, I didn’t understand that.";
    addMessage(botReply, 'bot');

  } catch (err) {
    addMessage("Something went wrong. Please check your project ID or network connection.", 'bot');
    console.error(err);
  }
}

function addMessage(msg, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add(sender);
  msgDiv.textContent = msg;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}
