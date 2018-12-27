const network = {
	blockchain:'eos',
	chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
	host:'api-kylin.eosasia.one',
	port:443,
	protocol:'https'
};
//test
ScatterJS.plugins( new ScatterEOS() );
let scatter, eos;

ScatterJS.scatter.connect('EOScatter').then(connected => {
	if(!connected) return false;
	
	scatter = ScatterJS.scatter;
	
	if(scatter.identity){
		eos = scatter.eos(network, Eos);
		window.getDisplay();
	}
	console.log('sc', scatter);
});

window.getDisplay = () => {
	const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
	
	if (account) {
		document.getElementById('loginDisplay').style.display = 'block';
		document.getElementById('logoutDisplay').style.display = 'none';
	}
	else{
		document.getElementById('loginDisplay').style.display = 'none';
		document.getElementById('logoutDisplay').style.display = 'block';
	}

	window.getInfo();
};

window.getInfo = async () => {
	const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

	const tokenAddress = document.getElementById('tokenAddress').value;
	const symbolName = document.getElementById('symbolName').value;

	const balances = await eos.getTableRows({
        json:true,
        code:tokenAddress,
        scope:account.name,
        table:'accounts',
        limit:500
	}).then(res => res.rows).catch(err => {
		document.getElementById('token').innerHTML = tokenAddress + '알수 없는 token address 입니다.' ;
		console.error(err);
	});
			
    const row = balances.find(row => row.balance.split(" ")[1].toLowerCase() === symbolName.toLowerCase());
    const balance = row ? row.balance.split(" ")[0] : 0;

	document.getElementById('accountname').innerHTML = account.name; 
	document.getElementById('token').innerHTML = ' (' + balance + ' ' + symbolName.toUpperCase() + ')';
};

window.login = async () => {
	await scatter.suggestNetwork(network);
	await scatter.getIdentity({accounts:[network]});
	eos = scatter.eos(network, Eos);
	window.getDisplay();
};

window.logout = () => {
	scatter.forgetIdentity();

	document.getElementById('loginDisplay').style.display = 'none';
	document.getElementById('logoutDisplay').style.display = 'block';
	document.getElementById('success').style.display = 'none';
	document.getElementById('error').style.display = 'none';
};

window.transfer = async () => {
	const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
	const opts = { authorization:[`${account.name}@${account.authority}`] };
	
	const to = document.getElementById('to').value;
	const quantity = document.getElementById('quantity').value;
	const memo = document.getElementById('memo').value;
	const tokenAddress = document.getElementById('tokenAddress').value;
	const symbolName = document.getElementById('symbolName').value;
		
	if (to && quantity) {
		document.getElementById('error').style.display = 'none';

		const contract = await eos.contract(tokenAddress); 

		await contract.transfer(account.name, to, Number(quantity).toFixed(4) + ' ' + symbolName, memo, opts).then(transferred => {
			document.getElementById('success').style.display = 'block';
			document.getElementById('successMessage').innerHTML =
			'<a href="https://tools.cryptokylin.io/#/tx/' + transferred.transaction_id + '" target="_blank">' + transferred.transaction_id + '</a>';

			document.getElementById('to').value = '';
    		document.getElementById('quantity').value = '';
			document.getElementById('memo').value = '';

			window.getInfo();
		}).catch(error => {
			if(typeof error === 'object') error = error.message;
			else error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
			if(error.trim() === 'unknown key:') error = 'No such account';

			document.getElementById('success').style.display = 'none';
			document.getElementById('error').style.display = 'block';
			document.getElementById('errorMessage').innerHTML = error;
			 
			return null;
		});
	}else{
		document.getElementById('success').style.display = 'none';
		document.getElementById('error').style.display = 'block';
		document.getElementById('errorMessage').innerHTML = '*필수 항목을 입력해주세요.';
	}
};

window.updateMenu = () => {
	var tokenInfo = document.getElementById('tokenInfo');
	var options = null;

	if(tokenInfo.value == 'EOS'){
		options = ['EOS', 'eosio.token'];
	}else if(tokenInfo.value == 'MOON'){
		options = ['MOON', '111111111zip'];
	}

	var opt = document.createElement('option');

	opt.text = options[0];
	opt.value = options[1];

	document.getElementById('symbolName').value = opt.text;
	document.getElementById('tokenAddress').value = opt.value;

	window.getInfo();
}

window.onload = function(){
	var tokenInfo = document.getElementById('tokenInfo');
	var options = null;

	if(tokenInfo.value == 'EOS'){
		options = ['EOS', 'eosio.token'];
	}else if(tokenInfo.value == 'MOON'){
		options = ['MOON', '111111111zip'];
	}

	var opt = document.createElement('option');

	opt.text = options[0];
	opt.value = options[1];

	document.getElementById('symbolName').value = opt.text;
	document.getElementById('tokenAddress').value = opt.value;

	tokenInfo.onchange = updateMenu;
};
