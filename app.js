$(function(){
	function n(n){
		return n > 9 ? "" + n : "0" + n;
	}
	setInterval(function(){
		$.ajax({
			url: "cgi-bin/web.py?pin=goster",
			success: function(result){
				result.split("\n").forEach(function(pins){
					var pin = pins.split("=")[0];
					var durum = pins.split("=")[1];
					if(pin != 0){
						if(durum == 0){
							$(".bcm"+n(pin)).find("span").removeClass("etkin");
							$(".bcm"+n(pin)).find("span").addClass("pasif");
						}else{
							$(".bcm"+n(pin)).find("span").removeClass("pasif");
							$(".bcm"+n(pin)).find("span").addClass("etkin")
						}
					}
				});
			}
		});
	}, 500);
	$(".pins").click(function(){
		pinbcm = /bcm../g.exec($(this).attr("class"))[0].replace("bcm", "");
		var durum = $(this).find("span").attr("class");
		durum = durum == "etkin" ? "pasif" : "etkin";
		console.log(pinbcm + " = " + durum);
		
		$.ajax({ url: "cgi-bin/web.py?"+pinbcm+"="+durum })
	});
});
