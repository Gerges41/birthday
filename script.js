function checkPassword() {
    const input = document.getElementById('password-input').value.trim();
    const errorMsg = document.getElementById('error-msg');
    
    // دعم كلمة السر بأكثر من صيغة (12/10/2003 أو 12\10\2003)
    const validPasswords = ["12/10/2003", "12\\10\\2003", "12-10-2003"];

    if (validPasswords.includes(input)) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        window.scrollTo(0, 0);
    } else {
        errorMsg.innerText = "كلمة السر غير صحيحة، حاولي مرة أخرى! ♡";
    }
}

// إمكانية الضغط على Enter في الباسورد
document.getElementById('password-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});
