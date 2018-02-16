(function(){
	$(document).ready(function(){
		var catarr = ['cat130012','cat640141','cat140208','cat140202','cat140204','cat140196','cat140210','cat140200','cat140198','cat1070023','cat1070024','cat140194','cat1070025','cat640143','cat1070027','cat250025','cat250026','cat250024','cat250023','cat250027','cat1070031','cat1070030','cat1070029','cat640143','cat1070033','cat1070032','cat250025','cat640145','cat640147','cat640149','cat640151'];
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
						h = h.replace('lowToHigh','newToOld').replace('highToLow','newToOld').replace('brandAlphabetical','newToOld')
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