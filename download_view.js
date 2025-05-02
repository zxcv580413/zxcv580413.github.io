function downloadData(userName, userID) {
    // 建立要傳送給伺服器的資料物件
    const requestData = new FormData();
    requestData.append('userName', userName);
    requestData.append('userID', userID);
	
	var loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';
	
    // 發送下載請求
    fetch("https://02f9-140-116-156-231.ngrok-free.app/download", {
        method: 'POST',
        body: requestData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // 判斷回傳的內容類型
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            // 如果是 JSON，解析為文字
            return response.text();
        } else {
            // 否則解析為 Blob 物件
            return response.blob();
        }
    })
    .then(data => {
		loadingSpinner.style.display = 'none';
        if (typeof data === 'string') {
            // 如果接收到 JSON 格式的錯誤訊息，顯示在控制台
            console.log("回應訊息：", data);
        } else {
            // 創建 Blob URL 進行下載
            const blobUrl = window.URL.createObjectURL(data);
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = 'downloaded_file.pptx';
            downloadLink.click();
            window.URL.revokeObjectURL(blobUrl);
        }
    })
    .catch(error => {
        console.error('下載失敗:', error);
        alert("下載失敗：" + error.message);
		loadingSpinner.style.display = 'none';
    });
}
