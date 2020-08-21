function check() {
  const posts = document.getElementsByClassName("post");
  postsA = Array.from(posts);
  postsA.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", (e) => {
      //クリックした時
      const postId = post.getAttribute("data-id"); //投稿id取得
      const XHR = new XMLHttpRequest(); //箱用意
      XHR.open("GET", `/posts/${postId}`, true); //どのようなリクエストをするのかを指定する
      XHR.responseType = "json"; //jsonに変換
      XHR.send(); //ルーティングに送る
      //ルーティング、コントローラー等を経て
      XHR.onload = () => {
        const item = XHR.response.post; //コントローラーrender json:{ post: item }と関係、postキーのitemバリュー
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      };
      XHR.onerror = () => {
        alert("Request failed");
      };
      //e.preventDefault();
    });
  });
}

setInterval(check, 1000);
// window.addEventListener("load", check);
