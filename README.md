<h1 style="font-size: 2em; margin-bottom: 16px; font-weight: 600; line-height: 1.25; border-bottom: 1px solid rgb(234, 236, 239); padding-bottom: 0.3em; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; margin-top: 0px !important;">EOScatter Wallet 구현하기</h1><p style="margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px;">EOSJS와 ScatterJS를 이용하여 간단한 EOS 웹 지갑 서비스를 구현해 봅니다.<br><br></p><h2 style="margin-bottom: 16px; margin-top: 24px; font-weight: 600; font-size: 1.5em; line-height: 1.25; border-bottom: 1px solid rgb(234, 236, 239); padding-bottom: 0.3em; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;">Part 1: 개발 환경 설정</h2><h3 style="margin-bottom: 16px; margin-top: 24px; font-size: 1.25em; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;">1.1. Install the prerequisites</h3><ul style="margin-bottom: 16px; padding-left: 2em; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px;"><li><p style="margin-bottom: 16px; margin-top: 16px;">테스트넷 (<a href="https://cryptokylin.io/" target="_blank" style="background-color: rgb(255, 255, 255);">https://cryptokylin.io</a>)</p><p style="margin-bottom: 16px; margin-top: 16px;">- Github&nbsp; &nbsp; &nbsp; :&nbsp;&nbsp;<a href="https://github.com/cryptokylin/CryptoKylin-Testnet" target="_blank" style="background-color: rgb(255, 255, 255);">https://github.com/cryptokylin/CryptoKylin-Testnet</a><br>- 계정 생성 :&nbsp;<span style="color: rgb(36, 41, 46); font-size: 16px;">&nbsp;</span><a href="http://faucet.cryptokylin.io/create_account?new_account_name" target="_blank">http://faucet.cryptokylin.io/create_account?new_account_name</a><br>- 코인 받기 :&nbsp;&nbsp;<a href="http://faucet.cryptokylin.io/get_token?your_account_name" target="_blank">http://faucet.cryptokylin.io/get_token?your_account_name</a><a href="http://faucet.cryptokylin.io/get_token?your_account_name" rel="nofollow" style="background-color: rgb(255, 255, 255); color: rgb(3, 102, 214); font-size: 14px;" target="_blank"></a></p><p style="margin-top: 16px; margin-bottom: 16px;">- CryptoKylin 테스트넷 정보</p><pre style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; padding: 16px; margin-bottom: 16px; line-height: 1.45; color: rgb(36, 41, 46); overflow-wrap: normal; background-color: rgb(246, 248, 250); border-radius: 3px;"><div style="color: rgb(212, 212, 212); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px;"><span style="color: rgb(156, 220, 254);">blockchain:</span><span style="color: rgb(206, 145, 120);">'eos'</span>,</div><div style="color: rgb(212, 212, 212); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px;"><span style="color: rgb(156, 220, 254);">chainId:</span><span style="color: rgb(206, 145, 120);">'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'</span>,</div><div style="color: rgb(212, 212, 212); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px;"><span style="color: rgb(156, 220, 254);">host:</span><span style="color: rgb(206, 145, 120);">'api-kylin.eosasia.one'</span>,</div><div style="color: rgb(212, 212, 212); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px;"><span style="color: rgb(156, 220, 254);">port:</span><span style="color: rgb(181, 206, 168);">443</span>,</div><div style="color: rgb(212, 212, 212); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px;"><span style="color: rgb(156, 220, 254);">protocol:</span><span style="color: rgb(206, 145, 120);">'https'</span></div></pre></li></ul><ul style="margin-bottom: 16px; padding-left: 2em; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px;"><li><p style="margin-bottom: 16px; margin-top: 16px;">Scatter Classic (Extension) :&nbsp; 크롬 확장 프로그램 설치 및 설정</p></li></ul><ul style="margin-bottom: 16px; padding-left: 2em; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px;"><li>NPM :&nbsp;<a href="https://nodejs.org" target="_blank">https://nodejs.org</a><a href="https://nodejs.org" target="_blank"></a><br><br></li></ul><h3 style="margin-bottom: 16px; margin-top: 24px; font-size: 1.25em; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;">1.2. git clone</h3><pre style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; margin-bottom: 16px; overflow-wrap: normal; background-color: rgb(246, 248, 250); border-radius: 3px; line-height: 1.45; padding: 16px; color: rgb(36, 41, 46);"><code style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 3px; margin: 0px; border: 0px; white-space: pre; word-break: normal; display: inline; line-height: inherit; overflow: visible; overflow-wrap: normal;">$ git clone https://github.com/moon382/EOScatterWallet
</code></pre><h3 style="margin-bottom: 16px; margin-top: 24px; font-size: 1.25em; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;">1.3. npm install</h3><pre style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; margin-bottom: 16px; overflow-wrap: normal; background-color: rgb(246, 248, 250); border-radius: 3px; line-height: 1.45; padding: 16px; color: rgb(36, 41, 46);"><code style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 3px; margin: 0px; border: 0px; white-space: pre; word-break: normal; display: inline; line-height: inherit; overflow: visible; overflow-wrap: normal;">$ cd ./EOScatterWallet
$ npm install</code></pre><h3 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;">1.4. 실행</h3><pre style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; padding: 16px; margin-bottom: 16px; line-height: 1.45; color: rgb(36, 41, 46); overflow-wrap: normal; background-color: rgb(246, 248, 250); border-radius: 3px;"><code style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 3px; white-space: pre; margin: 0px; border: 0px; word-break: normal; display: inline; line-height: inherit; overflow: visible; overflow-wrap: normal;">$ npm run serve</code></pre><p style="margin-bottom: 16px; font-size: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;">✔︎ 다음과 같은 결과가 출력됩니다.<br></p><pre style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; margin-bottom: 16px; overflow-wrap: normal; background-color: rgb(246, 248, 250); border-radius: 3px; line-height: 1.45; padding: 16px; color: rgb(36, 41, 46);"><code style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 3px; margin: 0px; border: 0px; white-space: pre; word-break: normal; display: inline; line-height: inherit; overflow: visible; overflow-wrap: normal;">&gt; http-server ./
Starting up http-server, serving ./
Available on:
</code>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://127.0.0.1:8080" target="_blank">http://127.0.0.1:8080</a>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://192.168.0.27:8080" target="_blank">http://192.168.0.27:8080</a>
<code style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 3px; margin: 0px; border: 0px; white-space: pre; word-break: normal; display: inline; line-height: inherit; overflow: visible; overflow-wrap: normal;">Hit CTRL-C to stop the server</code></pre><h3 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;">1.5. 크롬 웹 브라저 주소창에 URL 입력</h3><pre style="font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; padding: 16px; margin-bottom: 16px; line-height: 1.45; color: rgb(36, 41, 46); overflow-wrap: normal; background-color: rgb(246, 248, 250); border-radius: 3px;">URL : <a href="http://127.0.0.1:8080" target="_blank">http://127.0.0.1:8080</a> </pre><h3 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;">1.6. 웹 지갑 서비스 확인</h3><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><img src="https://raw.githubusercontent.com/moon382/EOScatterWallet/master/img/2.png" style="width: 529px;"><br></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><b><span style="font-size: 16px;">① 해당 URL로 접속 후 첫 화면이 나타나면 "SCATTER IDENTITY" 버튼을 클릭 합니다.<br></span><span style="font-size: 16px;">② Scatter의 "Identity Request" 창이 나타나면 원하는 계정을 선택 합니다.<br></span><span style="font-size: 16px;">③ "수락" 버튼을 클릭 하여 로그인 합니다.</span></b></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><span style="font-size: 16px; font-weight: 400;"><br></span></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><img src="https://raw.githubusercontent.com/moon382/EOScatterWallet/master/img/3.png" style="width: 1020px;"><br></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><b><span style="font-size: 16px;">①</span><span style="font-size: 16px;">&nbsp;전송을 원하는 EOS 또는 토큰을 선택하고 받는 사람, 수량, 메모(필수사항 아님)를 입력 합니다.<br></span><span style="font-size: 16px;">②&nbsp;</span><span style="font-size: 16px;">"SEND" 버튼을 클릭합니다.<br></span><span style="font-size: 16px;">③&nbsp;</span><span style="font-size: 16px;">Scatter의 "Signature Request" 창이 나타나면,&nbsp;</span><span style="font-size: 16px;">입력 정보를 다시 한번 확인 합니다.</span><span style="font-size: 16px;"><br></span><span style="font-size: 16px;">④&nbsp;</span><span style="font-size: 16px;">"수락" 버튼을 클릭하여, 코인을 전송합니다.</span></b></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><span style="font-size: 16px; font-weight: 400;"><br></span></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><img src="https://raw.githubusercontent.com/moon382/EOScatterWallet/master/img/4.png" style="width: 529px;"><span style="font-size: 16px; font-weight: 400;"><br></span></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><span style="font-size: 16px;"><b>전송에 성공하면, 위와 같이 SUCCESS 메세지와 함께 트랜잭션 ID를 확인할 수 있습니다.&nbsp;</b></span></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><br></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><img src="https://raw.githubusercontent.com/moon382/EOScatterWallet/master/img/5.png" style="width: 907px;"><span style="font-size: 16px; font-weight: 400;"><br></span></p><p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; line-height: 1.25; color: rgb(36, 41, 46); margin-top: 24px; margin-bottom: 16px; font-size: 1.25em;"><span style="font-size: 16px;"><b>트랜잭션 ID를 클릭하면 위와 같이 테스트넷 익스플로러에서 전송된 트랜잭션 정보를 확인 할 수 있습니다.</b></span></p>
