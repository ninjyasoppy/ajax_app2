function memo() {
  const submit = document.getElementById("submit"); //「投稿する」ボタンの情報を取得
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form")); //フォームに入力した情報を取得する
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json"; //レスポンスの形式を定義
    XHR.send(formData); //メモ投稿のフォームに入力された情報を送信
    XHR.onload = () => {
      const item = XHR.response.post; //帰ってきた情報
      const list = document.getElementById("list"); //新規投稿される箇所のid
      const formText = document.getElementById("content"); //入力したformのid
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML); //<div id="list"></div>の直後に入れる
      formText.value = ""; //テキストの内容を空に戻しておく（上書きしてる）
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };
    XHR.onerror = function () {
      alert("Request failed");
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
