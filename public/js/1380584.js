(function(){
	$(document).ready(function(){
		var catarr = ['cat140140','cat690115','cat60245','cat530051','cat140130','cat1040049','cat140132','cat140150','cat490024','cat510036','cat140090','cat950023','cat960037','cat610052','cat910032','cat140118','cat140142','cat800026','cat610053','cat650107','cat50003','cat270038','cat270031','cat270065','cat260024','cat140076','cat270057','cat60022','cat1470023','cat1970026','cat140094','cat60075','cat1970027','cat370030','cat370027','cat140134','cat60054','cat60063','cat60032','cat60042','cat140144','cat140146','cat140118','cat370028','cat440094','cat440092','cat440096','cat60012','cat60253','cat610035','cat610034','cat610032','cat1960024','cat1960025','cat1970023','cat870078','cat60022','cat60199','cat520024','cat700028','cat610049','cat600023','cat2280026','cat640139'];
		var catlnk = $('div#topNav ul.nav li a[href], div.newhpnav ul li a[href], div#newhpnav ul li a[href], div#facetSubCatLinks ul li a[href],.categorySlotContent a[href]').filter(function(){return $(this).attr('href').indexOf('Ns=')<0;});
		catlnk.each(function(){
			var h = $(this).attr('href'); var r = false;
			for (var i=0;i<catarr.length;i++) {
				if (h.indexOf(catarr[i])>-1) {
					r = true;
					break;
				}
			}
			if (r) {
				if (h.indexOf('?')<0) {
					h = h + '?s=newToOld';
				} else {
					if (h.indexOf('?s=')>-1 || h.indexOf('&s=')>-1) {
						h = h.replace('lowToHigh','newToOld').replace('highToLow','newToOld').replace('brandAlphabetical','newToOld');
						h = h.replace('percentHighToLow','newToOld').replace('powerReviewRatings','newToOld');
					} else {
						h = h + '&s=newToOld';
					}
				}
				$(this).attr('href',h);
				//$(this).css('color','red'); //used for debugging
			}
		});
	});
})();