function displayFileNames() {
    const fileInput = document.getElementById('fileInput');
    const pictureFileInput = document.getElementById('picturefileInput');
    const fileNamesDiv = document.getElementById('fileNames');
    fileNamesDiv.innerHTML = ''; // 清空之前的内容

    let fileNames = '';

    // 處理 fileInput 選擇的檔案
    if (fileInput.files.length > 0) {
        fileNames += '選擇的檔案:<br>';
        for (let i = 0; i < fileInput.files.length; i++) {
            fileNames += fileInput.files[i].name + '<br>';
        }
    }

    // 處理 pictureFileInput 選擇的檔案
    if (pictureFileInput.files.length > 0) {
        fileNames += '選擇的壓縮檔(圖片病歷):<br>';
        for (let i = 0; i < pictureFileInput.files.length; i++) {
            fileNames += pictureFileInput.files[i].name + '<br>';
        }
    }

    // 若都未選擇檔案，顯示未選擇任何檔案
    if (fileInput.files.length === 0 && pictureFileInput.files.length === 0) {
        fileNames = '未選擇任何檔案';
    }

    fileNamesDiv.innerHTML = fileNames;
}



function uploadFiles() {
    // 清空上次回應的訊息
    document.getElementById("responseMessage").innerHTML = '';

    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;
    var userEmail = document.getElementById("email").value;
    //var pasthistory = '[' + Array.from(selectedPastConditions).map(item => `"${item}"`).join(',') + ']';
    //var familyhistory = '[' + Array.from(selectedConditions).map(item => `"${item}"`).join(',') + ']';
    //var family_history_heart = document.getElementById("family_history_heart").value;
    //var family_history_heart_input = document.getElementById("family_history_heart_input").value;
    //var smoking = document.getElementById("smoking").value;
    //var drinking = document.getElementById("drinking").value;
    //var drug_allergy = document.getElementById("drug_allergy").value;

    const fileInput = document.getElementById('fileInput');
    const picturefileInput = document.getElementById('picturefileInput'); // 注意这里的 ID

    const api_url = "https://0db7-140-116-156-231.ngrok-free.app/upload";

    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('pasthistory', "");
    formData.append('familyhistory', "");
    formData.append('family_history_heart', "");
    formData.append('family_history_heart_input', "");
    formData.append('smoking', "");
    formData.append('drinking', "");
    formData.append('drug_allergy', "");

    const files = fileInput.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append('fileInput', files[i]);
        }
    }

    const folderFiles = document.getElementById('picturefileInput').files;
    if (folderFiles.length > 0) {
        formData.append('picturefileInput', folderFiles[0]);
    }

    // 計算預計完成時間
    const totalFiles = files.length + folderFiles.length;
    const estimatedTime = totalFiles * 3; // 每個檔案3分鐘
    const estimatedTimeMessage = `預計處理時間為 ${estimatedTime} 分鐘。`;

    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';  // 顯示加載中 Spinner
    loadingSpinner.querySelector('p').innerHTML = '正在上傳資料...';

    fetch(api_url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('網路錯誤');
    })
    .then(data => {
        console.log('伺服器回應:', data);

        // 更新HTML，顯示伺服器的回應和預計處理時間
        document.getElementById("responseMessage").innerHTML = data.message + '<br>' + estimatedTimeMessage;

        // 收到伺服器回應後隱藏加載中 Spinner
        loadingSpinner.style.display = 'none';
    })
    .catch(error => {
        console.error('錯誤:', error);
        document.getElementById("responseMessage").innerHTML = '上傳失敗: ' + error.message;

        // 錯誤情況下隱藏加載中 Spinner
        loadingSpinner.style.display = 'none';
    });
}









