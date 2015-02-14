//Data defs
var currentTaxes = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) { 
		this.sm = 0.33;
		this.tm = 0.2;
		this.maksuvaba = 154;
		this.netopalk = netSalary(bruto, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	}
};

var empty = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) { 
		return 0;
	},
	name: "",
	abbr: "",
	explain: "",
	color: "#fff",
	opacity: 0
};

var ekre = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) { 
		this.sm = 0.33;
		this.tm = Math.max(0, 0.2 - lapsi * 0.05);
		this.maksuvaba = 390;
		this.netopalk = netSalary(bruto, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},
	name: "Eesti Konservatiivne Rahvaerakond",
	abbr: "EKRE",
	explain: "Sinu võit tulumaksult.",
	color: "#0077bd",
	opacity: 1
};

var ekre_sm = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) { 
		this.sm = 0.33;
		this.tm = Math.max(0, 0.2 - lapsi * 0.05);
		this.maksuvaba = 390;
		this.netopalk = netSalary(bruto, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},
	name: "Eesti Konservatiivne Rahvaerakond*",
	abbr: "EKRE*",
	explain: "Sinu maksimaalne võimalik võit tulu- ja sotsiaalmaksult.",
	color: "#0077bd",
	opacity: 0.5
};

var irl = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) {
		this.sm = 0.33;
		this.tm = 0.2;
		this.maksuvaba = Math.min(Math.max(1000 - bruto * (1 - 0.016 - sammas * 0.02), 154), 500);
		this.netopalk = netSalary(bruto, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},			
	name: "Isamaa ja Res Publica Liit",
	abbr: "IRL",
	explain: "Sinu võit tulumaksult.",
	color: "#0095ce",
	opacity: 1
};

var irl_sm = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) {
		this.sm = 0.33;
		this.tm = 0.2;
		this.maksuvaba = Math.min(Math.max(1000 - bruto * (1 - 0.016 - sammas * 0.02), 154), 500);
		this.netopalk = netSalary(bruto, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},			
	name: "Isamaa ja Res Publica Liit*",
	abbr: "IRL*",
	explain: "Sinu maksimaalne võimalik võit tulu- ja sotsiaalmaksult.",
	color: "#0095ce",
	opacity: 0.5
};

var reform = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) {
		this.sm = 0.31;
		this.tm = 0.2;
		this.maksuvaba = 300;
		this.netopalk = netSalary(bruto, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},
	name: "Reformierakond",
	abbr: "RE",
	explain: "Sinu võit tulumaksult.",
	color: "#ffe200",
	opacity: 1
};

var reform_sm = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) {
		this.sm = 0.31;
		this.tm = 0.2;
		this.maksuvaba = 300;
		var brutosm = bruto*1.338/(1.008 + this.sm);
		this.netopalk = netSalary(brutosm, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},
	name: "Reformierakond*",
	abbr: "RE*",
	explain: "Sinu maksimaalne võimalik võit tulu- ja sotsiaalmaksult.",
	color: "#ffe200",
	opacity: 0.5
};

var sde = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) {
		this.sm = 0.33 - Math.max(0.03 * maal, 0.13 * soodusgrupp);
		this.tm = (Math.max(bruto * (1 - 0.016 - sammas * 0.02) - 154, 0) * 0.20 + Math.max(bruto * (1 - 0.016 - sammas * 0.02) - 1600, 0)*0.09) / (bruto * (1 - 0.016 - sammas * 0.02) - 154);
		this.maksuvaba = 154;
		this.netopalk = netSalary(bruto, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},			
	name: "Sotsiaaldemokraatlik Erakond",
	abbr: "SDE",
	explain: "Sinu võit tulumaksult.",
	color: "#aa0b04",
	opacity: 1
};

var sde_sm = {
	sm: 0,
	tm: 0,
	maksuvaba: 0,
	netopalk: 0,
	fun: function(bruto, lapsi, maal, soodusgrupp, sammas) {
		this.sm = 0.33 - Math.max(0.03 * maal, 0.13 * soodusgrupp);
		this.maksuvaba = 154;
		var brutosm = bruto*1.338/(1.008 + this.sm);
		this.tm = (Math.max(brutosm * (1 - 0.016 - sammas * 0.02) - 154, 0) * 0.20 + Math.max(brutosm * (1 - 0.016 - sammas * 0.02) - 1600, 0)*0.09) / (brutosm * (1 - 0.016 - sammas * 0.02) - 154);
		this.netopalk = netSalary(brutosm, this.tm, this.maksuvaba, sammas);
		return this.netopalk - currentNet(bruto, sammas);
	},				
	name: "Sotsiaaldemokraatlik Erakond*",
	abbr: "SDE*",
	explain: "Sinu maksimaalne võimalik võit tulu- ja sotsiaalmaksult.",
	color: "#aa0b04",
	opacity: 0.5
};

erakonnad = [irl, irl_sm, empty, sde, sde_sm, empty, reform, reform_sm, empty, ekre, ekre_sm];