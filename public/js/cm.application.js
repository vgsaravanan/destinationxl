var skuAttributesString;function popSpinSet(url){popUrl(url,500,400);}
function updateURLParameter(url,param,paramVal){var newAdditionalURL="";var tempArray=url.split("?");var baseURL=tempArray[0];var additionalURL=tempArray[1];var temp="";if(additionalURL){tempArray=additionalURL.split("&");for(i=0;i<tempArray.length;i++){if(tempArray[i].split('=')[0]!=param){newAdditionalURL+=temp+tempArray[i];temp="&";}}}
var rows_txt=temp+""+param+"="+paramVal;return baseURL+"?"+newAdditionalURL+rows_txt;}
function popUrl(url,width,height){var newwindow=window.open(url,'name','height='+height+',width='+width);if(window.focus){newwindow.focus()}}
function setFormValues(submitVal){document.shippingAddress.nickname.value=document.shippingAddress.address1.value;document.shippingAddress.submit();}
function assignShipToAddressName(){var selVal=document.getElementById("selectshipToAddressName");var selOption=selVal.options[selVal.selectedIndex].value;document.shippingAddress.txtShipToAddressName.value=selOption;}
function submitOthers(value)
{documentshipAddressMultiple.submit();document.multipleShipping.submit();}
function setCids(){var cIds=document.multipleShippingAddr.myCommerceItemIdsToMove;var cIds1=document.multipleShippingAddr.commerceItemIdsToMove;for(i=0;i<cIds.length;i++){cIds1[i].value=cIds[i].value;}}
function changeAddressTypeBilling(radio){document.location.href="billing.jsp?addressType="+radio.value;}
$(".giftCard a").click(function(){$(this).siblings("div").toggleClass("gCToggleContent");});$(".giftCard .typeCheck input").change(function(){$(this).parent(".typeCheck").siblings("div").toggleClass("gCToggleContent");});function updateCartDisplay(returnPath){var inlineCartURL=CONTEXT_ROOT+'/global/header/cart_summary.jsp?hasRealOrderTotal=false&returnPath='+returnPath+'&foo='+Math.floor(Math.random()*10000);$.get(inlineCartURL,function(data){$('#newPersistentCart').html(data);});var miniCartURL=CONTEXT_ROOT+'/global/header/minicart.jsp?returnPath='+returnPath+'&foo='+Math.floor(Math.random()*10000);$.get(miniCartURL,function(data){$('#miniCart').html(data);}).complete(function(){miniCartItemAdded();});}
function clearCreditCardFields(){$("#selectedCreditCardName").val('unselected');hideAllCards();$("#creditCardNumberHidden").val('');$("#creditCardToken").val('');$("#year").val('year');$("#month").val('month');$(".cardTypes input").removeAttr("disabled");$(".cardTypes input").attr("checked",false);$("#creditCardNumber").val('');$("#creditCardNumber").removeAttr("disabled");$("#cardSecurityCode").val('');}
function updateSkuAttributesInput(event) {
	
	var selectedSkuAttributes = $('#skuAttributesSpan').text();
	var requiredAttrs = $("#requiredAttributes").val().split("@").filter( function(item){
		return item;
	});
	var missingAttrs = [];
	var errorMessage = '';
	
	requiredAttrs.map( function(attribute) {
		
		if (attribute == 'hemmingLength') {
			if ($('#hemmingLength').val() == '') {
				missingAttrs.push(attribute);
			}
		} else {
			if( selectedSkuAttributes.indexOf(attribute) === -1 ){
				missingAttrs.push(attribute);
			}
	  	}
		
	});
	
	if( missingAttrs.length === 0 ) {
		$('#skuAttributes').val(selectedSkuAttributes);
		return true;
	} else {
		event.preventDefault();
		errorMessage = "Please select " + missingAttrs.join(", ");
		if($("#content").find(".errorMessage .interactionMessage").length > 0){
			$("#content").find(".errorMessage").remove();
			$("#mainContent").before('<div class="errorMessage" style="display: block;"><div class="interactionMessage"><ul><li><p>'+ errorMessage +'</p></li></ul></div></div>');
		} else {
			$("#mainContent").before('<div class="errorMessage" style="display: block;"><div class="interactionMessage"><ul><li><p>'+ errorMessage +'</p></li></ul></div></div>');
		}
		$(window).scrollTop( $("#content").find(".errorMessage").scrollTop() );
		
	}
}
function cmChangeImage(zoomViewerUrl,newColor)
{embedSwf(zoomViewerUrl,'');}
function cmChangeColor(newColor,newZoomViewerUrl,repositoryId)
{var oldColor=$("#cartColor").text();var unavailableColor=$("a#"+repositoryId).parent().hasClass("unavailable");if(unavailableColor!=true){unavailableColor=($("a#"+repositoryId).parent().hasClass("preSelect")&&$("a#"+repositoryId).parent().hasClass("selected"));}
if(unavailableColor!=true){cmChangeImage(newZoomViewerUrl,newColor);if($("#selectedColor").text()==newColor){$("#selectedColor").text("");}else{$("#selectedColor").text(newColor);}
if(oldColor!=null&&oldColor.substr(0,newColor.length)===newColor){$("#cartColor").text("");}else{$("#cartColor").text(newColor+",");}
cmChangeSize(repositoryId,"color",false);}}
function cmChangeColorNew(newColor,repositoryId,obj,ignoreAvailability,requestType)
{if(obj!=undefined){if($(obj).parent(".preSelect").length>0&&$(obj).parent(".stopselected").length>0){return false;}}
if(ignoreAvailability){if(requestType=='ISPU_PDP'){if($('.ispuModalSwatchImage').length==1&&$("#selectedColorStrInv").text()==newColor){return false;}}else{if($('.findInStoreSwatchImage').length==1&&$("#selectedColorStrInv").text()==newColor){return false;}}}
var colorSelector=repositoryId;if(ignoreAvailability){colorSelector=repositoryId+"StrInv";}
var oldColor=$("#cartColor").text();if(ignoreAvailability){oldColor=$("#storeCartColor").text();}
var unavailableColor=$("a."+colorSelector).parent().hasClass("unavailable");if(unavailableColor!=true){unavailableColor=($("a."+colorSelector).parent().hasClass("preSelect")&&$("a."+colorSelector).parent().hasClass("selected"));}
if(unavailableColor!=true){if(ignoreAvailability){var newColorHyphenated=newColor.replace(/ /gi,'-');newColorHyphenated=newColorHyphenated+"StrInv";$('.color.color'+newColorHyphenated).parent().addClass("stopselected");if($("#selectedColorStrInv").text()==newColor){$('.color.color'+newColorHyphenated).parent().removeClass("stopselected");$("#selectedColorStrInv").text("");$('.inStock').hide();$('.outOfStock').hide();$('input[name="shipToStore"]').attr('disabled',true);}else{$('.color.color'+newColorHyphenated).parent().addClass("stopselected");$("#selectedColorStrInv").text(newColor);}
if(oldColor!=null&&oldColor.substr(0,newColor.length)===newColor){$("#storeCartColor").text("");}else{$("#storeCartColor").text(newColor+",");}
cmChangeSize(repositoryId,"color",true,requestType);}else{var newColorHyphenated=newColor.replace(/ /gi,'-');if($("#selectedColor").text()==newColor){$('.color.color'+newColorHyphenated).parent().removeClass("stopselected");$("#selectedColor").text("");}else{$('.color.color'+newColorHyphenated).parent().addClass("stopselected");$("#selectedColor").text(newColor);}
if(oldColor!=null&&oldColor.substr(0,newColor.length)===newColor){$("#cartColor").text("");}else{$("#cartColor").text(newColor+",");}
cmChangeSize(repositoryId,"color",false,requestType);}}
if(!ignoreAvailability){if($("#"+repositoryId+"StrInv").length&&(!$("#"+repositoryId+"StrInv").parent().hasClass("selected")&&!$("#"+repositoryId+"StrInv").parent().hasClass("preSelect"))){$("#"+repositoryId+"StrInv").click();}}}
function cmChangeThumbnailColor(color,idSelector,prodId)
{var prodImageClass="img."+prodId;var origSrc=$(prodImageClass).attr('src');var subString;if(origSrc.indexOf("/new")==-1)
{subString=origSrc.replace(origSrc.substring(origSrc.lastIndexOf("/")+1,origSrc.indexOf("?")),"");}
else
{subString=origSrc.replace(origSrc.substring(origSrc.indexOf("src=")+4,origSrc.indexOf("&size=")),"");}
if(origSrc.indexOf("/new")==-1)
{$(prodImageClass).attr('src',subString.splice(origSrc.lastIndexOf("/")+1,0,'p'+prodId+color));}
else
{$(prodImageClass).attr('src',subString.splice(origSrc.indexOf('src=')+4,0,'p'+prodId+color));}}
function cmsChangeSize(obj){var attrName=$(obj).attr('class');var attrNameParent=$(obj).parent().attr('class');var chosenHemmingLength="#chosenHemmingLength";var attrValue=$(obj).text();var attrId=attrName+attrValue;var targetChosenHemmingLength="#"+attrId+" "+chosenHemmingLength;if($(obj).parent(".unavailable").length>0||($(obj).parent(".preSelect").length>0&&$(obj).parent(".selected").length>0)){return false;}
cmChangeSize($(obj).text(),$(obj).attr('class'),false);return false;}
function cmsChangeSizeIgnoreAvailability(obj){var attrName=$(obj).attr('class');var attrNameParent=$(obj).parent().attr('class');var chosenHemmingLength="#chosenHemmingLength";var attrValue=$(obj).text();var attrId=attrName+attrValue;var targetChosenHemmingLength="#"+attrId+" "+chosenHemmingLength;if($(obj).parent(".unavailable").length>0||($(obj).parent(".preSelect").length>0&&$(obj).parent(".selected").length>0)){return false;}
cmChangeSize($(obj).text(),$(obj).attr('class').replace('StrInv',''),true);return false;}
function cmChangeSize(attrValue,attrName,ignoreAvailability,requestType)
{if(ignoreAvailability==undefined){ignoreAvailability=false;}
var sizeId="#"+attrName;if(ignoreAvailability){sizeId=sizeId+"StrInv";}
var sizeIdIsInput=$(sizeId).is(":input");var cartId='#cart'+attrName;if(ignoreAvailability){cartId='#storeCart'+attrName;}
var oldAttrValue=$(cartId).text();oldAttrValue=oldAttrValue.replace(",","");oldAttrValue=oldAttrValue.replace("/ /g","");if(oldAttrValue!=null&&oldAttrValue==attrValue){$(cartId).text("");}else{$(cartId).text(attrValue+",");}
skuAttributesString=$('#skuAttributesSpan').text();if(ignoreAvailability){skuAttributesString=$('#skuAttributesSpanStrInv').text();}
if(skuAttributesString==null){skuAttributesString='';}
var tempAttrString="";var attrString=attrName+'=';if(attrValue){tempAttrString=attrName+'='+attrValue+'@';}
var oldvalue=(sizeIdIsInput?oldAttrValue:$(sizeId).text());var oldAttrString=attrName+'='+oldvalue+'@';var attrNameSelector=attrName;if(ignoreAvailability){attrNameSelector=attrName+"StrInv";}
if($("#"+attrNameSelector).text()!=""){skuAttributesString=skuAttributesString.replace(oldAttrString,"");var safeString=oldvalue.replace(/\./,"\\.");safeString=safeString.replace(" ","\\ ");safeString=safeString.replace("/","\\/");safeString=safeString.replace("(","\\(");safeString=safeString.replace(")","\\)");if(ignoreAvailability){safeString=safeString+"StrInv";}
$("#"+attrName+"-"+safeString).parent().removeClass("selected");if(!sizeIdIsInput){$(sizeId).text("");}}
if(tempAttrString&&oldAttrString!=tempAttrString){if(skuAttributesString.indexOf(tempAttrString)<0){skuAttributesString=skuAttributesString+tempAttrString;}
var safeString=attrValue.replace(/\./,"\\.");safeString=safeString.replace(" ","\\ ");safeString=safeString.replace("/","\\/");safeString=safeString.replace("(","\\(");safeString=safeString.replace(")","\\)");if(ignoreAvailability){safeString=safeString+"StrInv";}
$("#"+attrName+"-"+safeString).parent().addClass("selected");if(!sizeIdIsInput){$(sizeId).text(attrValue);}}
if(ignoreAvailability){$('#skuAttributesSpanStrInv').text(skuAttributesString);}else{$('#skuAttributesSpan').text(skuAttributesString);}
if($('#fb_local_ispu_modal_store').length>0&&!($('#fb_local_ispu_modal_store').is(":visible"))){$('#skuAttributesSpanStrInv').text($('#skuAttributesSpan').text());}
updateSkuAvailability(attrName,ignoreAvailability,requestType);if(!ignoreAvailability){var input=$("#"+attrName+"StrInv");if(input.is("select")&&!input.parents("li").hasClass("preSelect")){input.val($("#"+attrName).val());input.change();}else{var idSelector=attrName+"-"+attrValue+"StrInv";$("[id='"+idSelector+"']").val($("#"+attrName+"-"+attrValue).val())
$("[id='"+idSelector+"']").click();}}
if($('#fb_local_ispu_modal_store').length>0&&attrName!='color'&&requestType!='ISPU_PDP'){cmChangeSize(attrValue,attrName,'true','ISPU_PDP');}}
function changeHemmingOption(obj,ignoreAvailability){if(ignoreAvailability==undefined){ignoreAvailability=false;}
var hemmingValue=obj.value;var hemmingText="#chosenHemmingLength";var cartHemmingText="#cartHemmingLength";if(ignoreAvailability){hemmingText="#chosenHemmingLengthStrInv";cartHemmingText="#cartHemmingLengthStrInv";}
var hemmingLengthParent=$(obj).closest("ul").attr("id");var hemmingLengthParentId="#"+hemmingLengthParent+" "+hemmingText;$(hemmingLengthParentId).text(hemmingValue);$(cartHemmingText).text(hemmingValue+",");skuAttributesString=$('#skuAttributesSpan').text();if(ignoreAvailability){skuAttributesString=$('#skuAttributesSpanStrInv').text();}
updateSkuAvailability(skuAttributesString,ignoreAvailability);if(!ignoreAvailability){$("#hemmingLengthStrInv").val(hemmingValue);$("#hemmingLengthStrInv").change();}}
function changeMiscSizeOption(obj,id){$('#'+id).text(obj.value);}
function updateSkuAvailability(selectedAttr,ignoreAvailability,requestType){var productId=$("#productId").val();var checkAvailability=true;if(ignoreAvailability!=undefined){var checkAvailability=!ignoreAvailability;}
var hemmingText=$('select[id^="select-rise"]:not(:hidden)').val();if(hemmingText==null){hemmingText=$('select[id="hemmingLength"]').val();if(ignoreAvailability){hemmingText=$('select[id="hemmingLengthStrInv"]').val();}}
var quantity=$("#quantity").val();var priceRange=$("#priceRange").val();var complexPriceId=$("#complexPriceId").val();$.ajax({async:false,type:'POST',cache:false,url:'/mens-big-and-tall-store/catalog/includes/filterSkuOnAttributes.jsp',data:{productId:productId,skuAttributes:skuAttributesString,quantity:quantity,hemmingMessage:hemmingText,priceRange:priceRange,complexPriceId:complexPriceId,checkAvailability:checkAvailability},dataType:'json',success:function(data){if(!ignoreAvailability){$("#availability").html(data.inventoryMessage);$("#selectedColorPrice").text(data.skuPrice);$("#cartPrice").text(data.skuPrice);$("#hemmingMessage").text(data.hemmingMessage);$("#reqSkuId").val(data.skuId);}else if(requestType=='ISPU_PDP'){$("#ispuCartSkuId").text(data.skuId);$("#ispuCartPrice").text(data.skuPrice);if(null==data.skuPrice||$.trim(data.skuPrice)==''){if($('.ispuModalSwatchImage').length>1){$("#selectedColorStrInv").text("");}
$('.inStock').hide();$('.outOfStock').hide();$('input[name="shipToStore"]').attr('disabled',true);}
var isInstorePickUpEnabled='false';if($.trim($('#isInstorePickupEnabled').html())=='true'){isInstorePickUpEnabled='true';}
if(null!=data.skuId&&$.trim(data.skuId)!=''){if($.trim($('#isInstorePickupEnabled').html())=='true'){if($.trim($('#userPreferedStoreList').html())!=''){searchInUserPreferedStoreList(data.skuId,'true');}else{searchInUserSelectedSearchCriteria(data.skuId,'false');}}}else{if(isInstorePickUpEnabled=='true'){$('#inStorePickupStoreNumber').val('');}}}
if(data.isSurchargePresent==true){$("#surchargeMessage").text(data.surchargeMessage);}
$("#requiredAttributes").val(data.requiredAttributes);enableAttributeValueElements("size",data.size,checkAvailability);enableAttributeValueElements("waistSize",data.waistSize,checkAvailability);enableAttributeValueElements("coatSize",data.coatSize,checkAvailability);enableAttributeValueElements("coatLength",data.coatLength,checkAvailability);enableAttributeValueElements("pantLength",data.pantLength,checkAvailability);enableAttributeValueElementsDropdown("miscSize",data.miscSize,checkAvailability);enableAttributeValueElementsDropdown("miscSize2",data.miscSize2,checkAvailability);enableAttributeValueElementsDropdown("miscSize3",data.miscSize3,checkAvailability);var theSelect=$('select[name=pantLength]');if(ignoreAvailability){theSelect=$('select[name=pantLengthStrInv]');}
if(theSelect.length>0){var selectedValue=theSelect.val();var firstOption=$(document.createElement("option")).attr("value","").text("Select Inseam");theSelect.empty();theSelect.append(firstOption);if(data.pantLength!=null){var pantLengths=data.pantLength;for(var i=0;i<pantLengths.length;i++){theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));}}
if(ignoreAvailability){$('#chosenHemmingLengthStrInv').text(selectedValue)}else{$('#chosenHemmingLength').text(selectedValue)}
theSelect.val(selectedValue);}
var theSelect=$('#hemmingLength');if(ignoreAvailability){theSelect=$('#hemmingLengthStrInv');}
if(theSelect.length>0){var selectedValue=theSelect.val();var selectedValueStillValid=false;if(selectedValue=='Unfinished'){selectedValueStillValid=true;}
var firstHemmingOption=$(document.createElement("option")).attr("value","").text("Select Inseam");var unfinishedOption=$(document.createElement("option")).attr("value","Unfinished").text("Unfinished");theSelect.empty();theSelect.append(firstHemmingOption);theSelect.append(unfinishedOption);if(data.hemmingLength!=null){var hemmingLengths=data.hemmingLength;hemmingLengths=hemmingLengths.sort();for(var i=0;i<hemmingLengths.length;i++){if(hemmingLengths[i]==selectedValue){selectedValueStillValid=true;}
theSelect.append($(document.createElement("option")).attr("value",hemmingLengths[i]).text(hemmingLengths[i]));}}
if(selectedValueStillValid){if(ignoreAvailability){$('#chosenHemmingLengthStrInv').text(selectedValue)}else{$('#chosenHemmingLength').text(selectedValue)}
theSelect.val(selectedValue);}}
enableAttributeValueElements("shoeSize",data.shoeSize,checkAvailability);enableAttributeValueElements("sleeveSize",data.sleeveSize,checkAvailability);enableAttributeValueElements("shoeWidth",data.shoeWidth,checkAvailability);enableAttributeValueElements("rise",data.rise,checkAvailability);enableAttributeValueElements("neckSize",data.neckSize,checkAvailability);enableAttributeValueElements("shortLength",data.shortLength,checkAvailability);enableAttributeValueElements("pantSize",data.pantSize,checkAvailability);enableAttributeValueElements("underwearLength",data.underwearLength,checkAvailability);var cuff="cuff"
if(!checkAvailability){cuff=cuff+"StrInv";}
$("a."+cuff).parent().addClass("unavailable");if(data.cuff!=null){var cuffs=data.cuff;for(var i=0;i<cuffs.length;i++){$("a."+cuff).each(function(index,Element){if($(this).text()==cuffs[i]){$(this).parent().removeClass("unavailable");}});}}
var color="color"
if(!checkAvailability){color=color+"StrInv";}
$("a."+color).parent().addClass("unavailable");$("a."+color).children("#unavailableColorImage").css('display','inline');if(data.color!=null){var colors=data.color;for(var i=0;i<colors.length;i++){var colorId=colors[i].split(":")[1];if(!checkAvailability){colorId=colorId+"StrInv";}
$("."+colorId).each(function(){$(this).parent().removeClass("unavailable");$(this).find('#unavailableColorImage').css('display','none');});}}}});}
function enableAttributeValueElementsDropdown(attributeClass,attributeValues,checkAvailability){var storeInventoryClass=attributeClass;if(!checkAvailability){storeInventoryClass=attributeClass+"StrInv";}
var theSelect=$('#'+storeInventoryClass);if(theSelect.length>0){var selectedValue=theSelect.val();var firstOption=$(document.createElement("option")).attr("value","").text("Please Choose");theSelect.empty();theSelect.append(firstOption);if(attributeValues!=null){var pantLengths=attributeValues;pantLengths=pantLengths.sort();for(var i=0;i<pantLengths.length;i++){theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));}}
$('#'+storeInventoryClass+'Chosen').text(selectedValue);theSelect.val(selectedValue);}}
function enableAttributeValueElements(attributeClass,attributeValues,checkAvailability){var storeInventoryClass=attributeClass;if(!checkAvailability){storeInventoryClass=attributeClass+"StrInv";}
$("a."+storeInventoryClass).parent().addClass("unavailable");$("a."+storeInventoryClass).parent().children("#unavailableSizeImage").css('display','inline');if(attributeValues!=null){for(var i=0;i<attributeValues.length;i++){var tempString=attributeValues[i];tempString=tempString.replace(/\./,"\\.");tempString=tempString.replace("/","\\/");tempString=tempString.replace(" ","\\ ");if(!checkAvailability){tempString=tempString+"StrInv";}
var attribElemId=attributeClass+"-"+tempString;$("#"+attribElemId).parent().removeClass("unavailable");$("#"+attribElemId).parent().children("#unavailableSizeImage").css('display','none');}}}
function enableOutfitAttributeValueElements(productId,attributeClass,attributeValues){var prodAttributeClass="prod"+productId+"-"+attributeClass;$("a."+prodAttributeClass).parent().addClass("unavailable");if(attributeValues!=null){for(var i=0;i<attributeValues.length;i++){var tempString=attributeValues[i];tempString=tempString.replace(/\./,"\\.");tempString=tempString.replace("/","\\/");tempString=tempString.replace(" ","\\ ");var attribElemId=productId+"-"+attributeClass+"-"+tempString;$("#"+attribElemId).parent().removeClass("unavailable");}}}
function enableOutfitAttributeValueElementsDropdown(productId,attributeClass,attributeValues){var theSelect=$('#'+productId+"-"+attributeClass);if(theSelect.length>0){var selectedValue=theSelect.val();var firstOption=$(document.createElement("option")).attr("value","").text("Please Choose");theSelect.empty();theSelect.append(firstOption);if(attributeValues!=null){var pantLengths=attributeValues;pantLengths=pantLengths.sort();for(var i=0;i<pantLengths.length;i++){theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));}}
$('dd#'+attributeClass+'-'+productId).text(selectedValue);theSelect.val(selectedValue);}}
function submitCheckoutForm(skuId,cid,sgid){var sku=document.getElementById(skuId);var cartRelationShipId=document.getElementById("cartRelationShipId");cartRelationShipId.value=skuId;var upQty=document.getElementById("updateQuantity");upQty.value=sku.value;$('#updateCommerceItemId').val(cid);$('#updateSGId').val(sgid);var chkform=document.getElementById("checkoutForm");chkform.submit();}
function changeOutfitHemmingOption(obj,prodId){var hemmingValue=obj.value;var hemmingText="#chosenHemmingLength-"+prodId;var cartHemmingText="#cartHemmingLength";$(hemmingText).text(hemmingValue);$(cartHemmingText).text(hemmingValue+",");skuAttributesString=$('#skuAttributes').val();updateOutfitSkuAvailability(skuAttributesString,prodId);}
function cmOutfitChangeColor(newColor,newZoomViewerUrl,repositoryId,prodId,obj)
{if(obj!=undefined){if($(obj).parent(".preSelect").length>0&&$(obj).parent(".stopselected").length>0){return false;}}
var selectedColor="#selectedColor"+'-'+prodId;var unavailableColor=$("a.prod"+prodId+"-color.color-"+repositoryId).parent().hasClass("unavailable");if(unavailableColor!=true){unavailableColor=($("a.prod"+prodId+"-color.color-"+repositoryId).parent().hasClass("preSelect")&&$("a.prod"+prodId+"-color.color-"+repositoryId).parent().hasClass("selected"));}
if(unavailableColor!=true){var newColorHyphenated=newColor.replace(/ /gi,'-');$("a.prod"+prodId+"-color.color-"+repositoryId).parent().addClass("stopselected");$("#productId-"+prodId).attr('src',newZoomViewerUrl);if($(selectedColor).text()==newColor){$(selectedColor).text("");}else{$(selectedColor).text(newColor);}
$("#cartColor").text(newColor+",");cmOutfitChangeSize(repositoryId,"color",prodId);}}
function cmOutfitChangeThumbnailColor(newThumbURL,indexCount)
{var prodImageId="#productId"+indexCount;$(prodImageId).attr('src',newThumbURL);}
function cmsOutfitChangeSize(obj,prodId){if($(obj).parent(".unavailable").length>0||($(obj).parent(".preSelect").length>0&&$(obj).parent(".selected").length>0)){return false;}
var attrClass=($(obj).attr('class').split(' ')[0]);cmOutfitChangeSize($(obj).text(),attrClass,prodId);return false;}
function cmsOutfitChangeMiscSize(obj,value,prodId){var attrClass=($(obj).attr('class').split(' ')[0]);cmOutfitChangeSize(value,attrClass,prodId);return false;}
function cmOutfitChangeSize(attrValue,attrName,prodId)
{var sizeId="#"+attrName+'-'+prodId;var cartId='#cart'+attrName;$(cartId).text(attrValue+",");var skuAttributesString=$('#skuAttributes').val();if(skuAttributesString.match(prodId)){}else{if(skuAttributesString.match(":")){skuAttributesString=skuAttributesString+","+prodId+":";}else{skuAttributesString=prodId+":"+skuAttributesString;}}
var attrString=attrName+'=';if(attrName!="pantLength"){var tempAttrString=attrName+'='+attrValue+'@';}else{if(!attrValue.length){var tempAttrString=attrName+'='+$(sizeId).text()+'@';}else{var tempAttrString=attrName+'='+attrValue+'@';}}
var oldvalue=$(sizeId).text();var oldAttrString=attrName+'='+oldvalue+'@';var prodAttrs=skuAttributesString.substring(skuAttributesString.indexOf(prodId,0),skuAttributesString.length);if(prodAttrs==null){}else{var idx=prodAttrs.indexOf(",",0);if(idx>-1){prodAttrs=prodAttrs.substring(0,idx);}}
var prdIdx=skuAttributesString.indexOf(","+prodAttrs);if(prdIdx>-1){skuAttributesString=skuAttributesString.replace(","+prodAttrs,"");}else{skuAttributesString=skuAttributesString.replace(prodAttrs,"");}
if($("#"+attrName+'-'+prodId).text()!=""){prodAttrs=prodAttrs.replace(oldAttrString,"");var safeString=oldvalue.replace(/\./,"\\.");safeString=safeString.replace("/","\\/");safeString=safeString.replace("(","\\(");safeString=safeString.replace(")","\\)");$("a.prod"+prodId+"-"+attrName+"-"+safeString).parent().removeClass("selected");$(sizeId).text("");}
if(oldAttrString!=tempAttrString){prodAttrs=prodAttrs+tempAttrString;var safeString=attrValue.replace(/\./,"\\.");safeString=safeString.replace("/","\\/");safeString=safeString.replace("(","\\(");safeString=safeString.replace(")","\\)");$("a.prod"+prodId+"-"+attrName+"-"+safeString).parent().addClass("selected");if($("select.prod"+prodId+"-"+attrName).length>0){$("select.prod"+prodId+"-"+attrName).val(attrValue);}
$(sizeId).text(attrValue);}
if(skuAttributesString.length>0){skuAttributesString=skuAttributesString+","+prodAttrs;}else{skuAttributesString=skuAttributesString+prodAttrs;}
$('#skuAttributes').val(skuAttributesString);updateOutfitSkuAvailability(attrName,prodId);}
function updateOutfitSkuAvailability(selectedAttr,prodId){var productId=prodId;var hemmingText=$("#hemmingLength-"+productId).val();var quantity=$("#quantity-"+productId).val();var skuAttributesString=$('#skuAttributes').val();var indexofProductId=skuAttributesString.indexOf(prodId,0);var prodAttrs="";if(indexofProductId>=0){prodAttrs=skuAttributesString.substring(indexofProductId,skuAttributesString.length);skuAttributesString=prodAttrs.replace(productId+":","");}else{skuAttributesString="";}
$.post('/mens-big-and-tall-store/catalog/includes/filterOutfitSkuOnAttributes.jsp',{productId:productId,quantity:quantity,skuAttributes:skuAttributesString,hemmingMessage:hemmingText,checkAvailability:'true'},function(data){$("#availability-"+prodId).html(data.inventoryMessage);$("#hemmingMessage-"+prodId).text(data.hemmingMessage);$("#cartPrice").text(data.skuPrice);var userManuallyClicked=$("#userManuallyClicked"+prodId).html();if (data.skuPrice != ""){if(userManuallyClicked == ''){if (isAllAttributesSelectedInOutfit(prodId) == "true"){$("#productIds_" + prodId).attr('checked',true);}else{$("#productIds_" + prodId).attr('checked',false);}}}else{if(userManuallyClicked==''){$("#productIds_" + prodId).attr('checked',false);}}var isInstorePickUpEnabled='false';if($.trim($('#isInstorePickupEnabled').html())=='true'){isInstorePickUpEnabled='true';}
if(null!=data.skuPrice&&$.trim(data.skuPrice)!=''){if($.trim($('#isInstorePickupEnabled').html())=='true'){if($.trim($('#userPreferedStoreList').html())!=''){searchInUserPreferedStoreList(data.skuId,'true');}else{searchInUserSelectedSearchCriteria(data.skuId,'false');}}}else{if(isInstorePickUpEnabled=='true'){restartInstorePickupSearch();}}
if(data.isSurchargePresent==true){$("#surchargeMessage-"+prodId).text(data.surchargeMessage);}
enableOutfitAttributeValueElements(productId,"size",data.size);enableOutfitAttributeValueElements(productId,"waistSize",data.waistSize);enableOutfitAttributeValueElements(productId,"coatSize",data.coatSize);enableOutfitAttributeValueElements(productId,"coatLength",data.coatLength);enableOutfitAttributeValueElements(productId,"pantLength",data.pantLength);enableOutfitAttributeValueElementsDropdown(productId,"miscSize",data.miscSize);enableOutfitAttributeValueElementsDropdown(productId,"miscSize2",data.miscSize2);enableOutfitAttributeValueElementsDropdown(productId,"miscSize3",data.miscSize3);var theSelect=$('#'+productId+"-pantLength");if(theSelect.length>0){var selectedValue=theSelect.val();var firstOption=$(document.createElement("option")).attr("value","").text("Select Inseam");theSelect.empty();theSelect.append(firstOption);if(data.pantLength!=null){var pantLengths=data.pantLength;for(var i=0;i<pantLengths.length;i++){theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));}}
theSelect.val(selectedValue);}
var theSelect=$('#'+"hemmingLength-"+productId);if(theSelect.length>0){var selectedValue=theSelect.val();var selectedValueStillValid=false;if(selectedValue=='Unfinished'){selectedValueStillValid=true;}
var firstOption=$(document.createElement("option")).attr("value","").text("Select Inseam");var unfinishedOption=$(document.createElement("option")).attr("value","Unfinished").text("Unfinished");theSelect.empty();theSelect.append(firstOption);theSelect.append(unfinishedOption);if(data.hemmingLength!=null){var hemmingLengths=data.hemmingLength;hemmingLengths=hemmingLengths.sort();for(var i=0;i<hemmingLengths.length;i++){if(hemmingLengths[i]==selectedValue){selectedValueStillValid=true;}
theSelect.append($(document.createElement("option")).attr("value",hemmingLengths[i]).text(hemmingLengths[i]));}}
if(selectedValueStillValid){$("#chosenHemmingLength-"+prodId).text(selectedValue);theSelect.val(selectedValue);}else{$("#chosenHemmingLength-"+prodId).text("");}}
enableOutfitAttributeValueElements(productId,"shoeSize",data.shoeSize);enableOutfitAttributeValueElements(productId,"sleeveSize",data.sleeveSize);enableOutfitAttributeValueElements(productId,"shoeWidth",data.shoeWidth);enableOutfitAttributeValueElements(productId,"rise",data.rise);enableOutfitAttributeValueElements(productId,"neckSize",data.neckSize);enableOutfitAttributeValueElements(productId,"shortLength",data.shortLength);enableOutfitAttributeValueElements(productId,"pantSize",data.pantSize);enableOutfitAttributeValueElements(productId,"underwearLength",data.underwearLength);var prodCuff="prod"+productId+"-cuff";$("a."+prodCuff).parent().addClass("unavailable");if(data.cuff!=null){var cuffs=data.cuff;for(var i=0;i<cuffs.length;i++){var cuffId=cuffs[i];$("."+prodCuff+"-"+cuffId).parent().removeClass("unavailable");}}
var prodColor="prod"+productId+"-color";$("a."+prodColor).parent().addClass("unavailable");$("a."+prodColor).children("#unavailableColorImage").css('display','inline');if(data.color!=null){var colors=data.color;for(var i=0;i<colors.length;i++){var colorId=colors[i].split(":")[1];$(".color-"+colorId+"."+prodColor).parent().removeClass("unavailable");$(".color-"+colorId+"."+prodColor).find('#unavailableColorImage').css('display','none');}}},"json");}
var productViewer=function(){var replaceId="",width=0,height=0,requiredFlashVersion="0.0.0",mediaSet=[],parent=null,cachedMedia={};style="visibility:visible";function useCache(key,createNew){if(key in cachedMedia){parent.append(cachedMedia[key]);}else{cachedMedia[key]=createNew();}}
function changeStoreInventoryMediaHelper(urlSet){if("img"in urlSet){var imageUrl=urlSet["img"];imageUrl=imageUrl.replace("$Quick$","wid=155");imageUrl=imageUrl.replace("Product","category");return $("#storeInventoryProductImage").attr("src",imageUrl);}};function changeMedia(urlSet){var oldMedia=$("#"+replaceId).detach();if("swf"in urlSet&&swfobject.hasFlashPlayerVersion(requiredFlashVersion)){useCache(urlSet["swf"],function(){parent.append('<div id="'+replaceId+'"></div>');var requestUrl=urlSet["swf"];requestUrl+=(requestUrl.match(/\?/)?"&amp;":"?")+Math.floor(Math.random()*10000);requestUrl=requestUrl.replace(/&amp;/gi,'&');var attributes={"data":requestUrl,"width":width,"height":height,"style":style};var params={"wmode":"transparent"};return swfobject.createSWF(attributes,params,replaceId);});}else if("img"in urlSet){useCache(urlSet["img"],function(){return $('<div id="'+replaceId+'" style="visibility:visible"></div>').html('<img src="'+urlSet["img"]+'" />').appendTo(parent);});}};return{initialize:function(replaceIdArg,widthArg,heightArg,requiredFlashVersionArg,mediaSetArg){replaceId=replaceIdArg;width=widthArg;height=heightArg;requiredFlashVersion=requiredFlashVersionArg;mediaSet=mediaSetArg;parent=$("#"+replaceId).wrap('<div id="'+replaceId+'Parent" />').parent();cachedMedia={};},changeMedia:function(index,obj){if(obj!=undefined){if($(obj).parent(".unavailable").length>0){return false;}}
if(index<mediaSet.length){changeMedia(mediaSet[index]);}},changeStoreInventoryMedia:function(index,obj){if(obj!=undefined){if($(obj).parent(".unavailable").length>0){return false;}}
if(index<mediaSet.length){changeStoreInventoryMediaHelper(mediaSet[index]);}}}}();function cleansePOBox(pobox){return"PO BOX "+pobox.replace(/^p(?:\.| ?\.? ?o\.?) ?b(?:\.|ox) ?/i,"");}
function setAddressValidated(){$("#addressValidated").val("false");}
function setUserAddressInSession(){$("#userEditInSession").val("true");}
function updateShippingAmountGeneral(sgId,shippingAmount){var shippingAmounts=cartTotalsVar.shippingAmounts;var updated=false;if(shippingAmounts!=null){for(i=0;i<shippingAmounts.length;i++){if(shippingAmounts[i].sgId==sgId){shippingAmounts[i].value=shippingAmount;updated=true;}}}
if(!updated){shippingAmounts[shippingAmounts.length]={'sgId':sgId,'value':shippingAmount};}}
function updateShippingAmountForCartTotals(sgId,shippingAmount){updateShippingAmountGeneral(sgId,shippingAmount);updateCartTotalView();}
function updateCartTotalView(){$("#productTotal").text("$"+parseFloat(cartTotalsVar.productTotal).formatMoney(2,'.',','));$("#surcharge").text("$"+parseFloat(cartTotalsVar.surcharge).formatMoney(2,'.',','));$("#additionalSavings").text("$"+parseFloat(cartTotalsVar.additionalSavings).formatMoney(2,'.',','));var shippingAmountTotal=0.0;for(i=0;i<cartTotalsVar.shippingAmounts.length;i++){shippingAmountTotal+=parseFloat(cartTotalsVar.shippingAmounts[i].value);}
$("#shippingAmount").text("$"+shippingAmountTotal.formatMoney(2,'.',','));var orderSubtotal=parseFloat(cartTotalsVar.productTotal)+parseFloat(shippingAmountTotal)+
parseFloat(cartTotalsVar.surcharge)-parseFloat(cartTotalsVar.additionalSavings);$("#orderSubtotal").text("$"+orderSubtotal.formatMoney(2,'.',','));}
function updateExpressCheckoutCartTotalView(sgId,shippingAmount,shippingMethodId){$("input'[name="+sgId+"ChangeSM]'").val(shippingMethodId);$("#change-shipping-method").click();}
function showFacetClickedDialog(){$('#brands-wrap').removeClass('sticky-wrap');$('#brands').removeClass('sticky');$('#miniCart').removeClass('sticky-cart');$('#header-block').removeClass('sticky-block');$('#headerContent').removeClass('sticky-content-background');var $facetLinkClicked=$('#facetLinkClickedContent').dialog({modal:true,autoOpen:false,dialogClass:'noTitleStuff',closeText:'',width:230});$('div.noTitleStuff').css('background','none repeat scroll 0 0 transparent');$('div.noTitleStuff').css('border','none');$facetLinkClicked.dialog('open');return true;}
function sizeChartPopup(url){newwindow=window.open(url,'','height=700,width=680');if(window.focus){newwindow.focus()}
return false;}
Number.prototype.formatMoney=function(c,d,t){var n=this,c=isNaN(c=Math.abs(c))?2:c,d=d==undefined?",":d,t=t==undefined?".":t,s=n<0?"-":"",i=parseInt(n=Math.abs(+n||0).toFixed(c))+"",j=(j=i.length)>3?j%3:0;return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$1"+t)+(c?d+Math.abs(n-i).toFixed(c).slice(2):"");};function toggleResultsView(destination,collection){if(!destination)return;if(destination=='C'){if($('#CatViewDiv').children().length>0){$("#NonCatViewDiv").hide();$("#CatViewDiv").show();$(".noCat").slideUp();}else{showFacetClickedDialog();
var searchPageURLParam=$('#searchPageURLParam').val();searchPageURLParam=searchPageURLParam.replace(/amp;/g,"");searchPageURLParam=searchPageURLParam.replace(/ /g,"+");var searchTypeParam = $('#searchTypeParam').val();var preSelectFacetParam = $('#preSelectFacetParam').val();var showFirstSkuColor = $('#showFirstSkuColor').val();var pageURL = CONTEXT_ROOT + "/catalog/categoryView.jsp?searchTypeParam=" + searchTypeParam + "&preSelectFacetParam="+ preSelectFacetParam +  "&showFirstSkuColor=" + showFirstSkuColor +  searchPageURLParam;$("#CatViewDiv").load(pageURL,function(responseTxt,statusTxt,xhr){if(statusTxt=="success"){parent.tb_remove();var $facetLinkClicked=$('#facetLinkClickedContent');$facetLinkClicked.dialog('close');$("#NonCatViewDiv").hide();$("#CatViewDiv").show();$(".noCat").slideUp();}if(statusTxt=="error"){parent.tb_remove();var $facetLinkClicked=$('#facetLinkClickedContent');$facetLinkClicked.dialog('close');alert("Something went wrong. Please try after sometime");}});}}else if(destination===3||destination===4){$("#NonCatViewDiv").show();$("#CatViewDiv").hide();$(".noCat").slideDown();updateImageSizes(destination,collection);setItemHeight(collection,destination);}}
function updateImageSizes(destination,collection){var item=collection;var quickViewIcon=item.find('.quickViewHover');if(destination===3){resizeImage(item.find('img'),'$category$','$categoryX3$','size=155,203','size=207,273','pos=-57,-82','pos=-83,-117');collection.addClass('x3');quickViewIcon.removeClass('item-x4');quickViewIcon.addClass('item-x3');}
if(destination===4){resizeImage(item.find('img'),'$categoryX3$','$category$','size=207,273','size=155,203','pos=-83,-117','pos=-57,-82');collection.removeClass('x3');quickViewIcon.addClass('item-x4');quickViewIcon.removeClass('item-x3');}}
function resizeImage(collection,from,to,newSizeFrom,newSizeTo,newPosFrom,newPosTo){collection.each(function(i,e){e.src=e.src.replace(from,to);e.src=e.src.replace(newSizeFrom,newSizeTo);e.src=e.src.replace(newPosFrom,newPosTo);});}
function setItemHeight(collection,range){clearItemHeight(collection);var powerReviewsHeight=46;var itemHeight=0,range=range,limit=range;collection.each(function(i,e){var eHeight=$(e).find('.mouseHoverProductImage').outerHeight(true)+$(e).find('.swatches').outerHeight(true)+$(e).find('.icon').outerHeight(true)+$(e).find('.saleImage').outerHeight(true)
+$(e).find('.name').outerHeight(true)+$(e).find('.price').outerHeight(true)+powerReviewsHeight;itemHeight=Math.max(itemHeight,eHeight);if(i===range-1){collection.slice(range-limit,range).height(itemHeight);range+=limit;itemHeight=0;}});}
function clearItemHeight(collection){collection.height('auto');}
function startCheckout(){var newURL=$('#checkoutHeaderLink').attr('href');if (newURL.indexOf('?') > -1) {window.location = newURL+"&r="+Math.random();} else {window.location = newURL+"?r="+Math.random();}}
function toggleView(idx){$('.tabbedView').hide();$('.tabbedView').eq(idx).show();}
function showRewardsTab(idx){$('.rewardsTab').removeClass("active").eq(idx).addClass("active");toggleView(idx);}
function initRewardsTabs(idx){$('.rewardsTab').find('a').each(function(i,e){$(e).bind('click',function(){toggleView(i);})})}
String.prototype.splice=function(idx,rem,s){return(this.slice(0,idx)+s+this.slice(idx+Math.abs(rem)));};function swapImageOnHover(prodImageId){var company="CasualMale";var origSrc=$("img#"+prodImageId).attr('src');var skuHover;if(origSrc.indexOf("new")==-1){skuHover=origSrc.substring(origSrc.lastIndexOf("/")+1,origSrc.indexOf("?"))+"_hover";}else{skuHover=origSrc.substring(origSrc.indexOf("src=")+4,origSrc.indexOf("&size="))+"_hover";}
loadimagexists(company+'/'+skuHover,function(){var skuExists=imageExists(window.imagexists);if(skuExists){if(origSrc.indexOf("_hover")==-1){if(origSrc.indexOf("new")==-1){$("img#"+prodImageId).attr('src',origSrc.splice(origSrc.indexOf('?'),0,"_hover"));}else{$("img#"+prodImageId).attr('src',origSrc.splice(origSrc.indexOf('&size'),0,"_hover"));}}}},false);}
function revertImage(prodImageId){var origSrc=$("img#"+prodImageId).attr('src');if(origSrc.indexOf("_hover")!==-1){$("img#"+prodImageId).attr('src',origSrc.replace("_hover",""));}}
function showLargerSwatch(displayName,obj){var top=-2-$('#'+displayName+'Div').height();var left=-1;$('#'+displayName+'Div').css('top',top);$('#'+displayName+'Div').css('left',left);$('#'+displayName+'Div').css('display','block');}
function hideLargerSwatch(displayName){$('#'+displayName+'Div').css('display','none');}
function htmlUnescape(value){return String(value).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');}
jQuery.cachedScript=function(url,options){options=$.extend(options||{},{dataType:"script",cache:true,url:url});return jQuery.ajax(options);};function setStoreNumber(radio){$("#shipToStoreNumber").val(radio.value);}
function validateStoreSelection(){if(($("#shipToStoreNumber").val())==""){alert("Please select a store to continue.");return false;}}
function initPopUpModal(){$('#brands-wrap').removeClass('sticky-wrap');$('#brands').removeClass('sticky');$('#miniCart').removeClass('sticky-cart');$('#header-block').removeClass('sticky-block');$('#headerContent').removeClass('sticky-content-background');}
function storeModalInit(){initPopUpModal();$("#storeLocatorSideBar").css("display","none");$("#storeLocatorMap").css("display","none");$("#ispu_modal_pqv-errors").css("visibility","hidden");$("#storeLocatorSearchOptions").css("display","inline");$("#ispu_modal_sidebar").css("display","inline");$("#fb_store_locator_link").click();$('#fancybox-content').css('height','auto');return;}
function ispuStoreResultsModalInit(){initPopUpModal();$("#storeLocatorSideBar").css("display","block");$("#storeLocatorMap").css("display","block");$("#ispu_modal_pqv-errors").css("visibility","hidden");$("#storeLocatorSearchOptions").css("display","none");$("#ispu_modal_sidebar").css("display","inline");$("#fb_store_locator_link").click();$('#fancybox-content').css('height','auto');return;}
function generalModalInit(){initPopUpModal();$("#ISPU_StoreDetails_Link_Content").css("display","block");$("#fb_general_popup_link").click();$('#fancybox-content').css('height','auto');return;}
function submitSearch(){if($('#quickSearch-query').val()=="Search item# or keyword"){return false;}
return true;}
function pdpStoreModalInit(){initPopUpModal();$("#storeLocatorSideBar").css("display","block");$("#ispu_modal_pqv-errors").css("visibility","hidden");$("#storeLocatorSearchOptions").css("display","block");$("#ispu_modal_sidebar").css("display","inline");$("#fb_pdp_store_locator_link").click();$('#fancybox-content').css('height','auto');$('#fancybox-content').css('width','auto');return;}
function updateAndPerformISPUStoreSearch(skuId,skuPrice){$("#ispuCartSkuId").text(skuId);$("#ispuCartPrice").text(skuPrice);if(null==skuPrice||$.trim(skuPrice)==''){$("#selectedColorStrInv").text("");$('.inStock').hide();$('.outOfStock').hide();$('input[name="shipToStore"]').attr('disabled',true);}
var isInstorePickUpEnabled='false';if($.trim($('#isInstorePickupEnabled').html())=='true'){isInstorePickUpEnabled='true';}
if(null!=skuId&&$.trim(skuId)!=''){if($.trim($('#isInstorePickupEnabled').html())=='true'){if($.trim($('#userPreferedStoreList').html())!=''){searchInUserPreferedStoreList(skuId,'true');}else{searchInUserSelectedSearchCriteria(skuId,'false');}}}else{if(isInstorePickUpEnabled=='true'){$('#inStorePickupStoreNumber').val('');}}}
function loadScript(url,callback){var script=document.createElement("script")
script.type="text/javascript";if(script.readyState){script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){script.onreadystatechange=null;callback();}};}else{script.onload=function(){callback();};}
script.src=url;document.body.appendChild(script);}
function isAllAttributesSelectedInOutfit(productId) {
	var skuAttributesValue = $('#skuAttributes').val();
	var selectedAttributesList = skuAttributesValue.split(productId);
	var allAttributesSelected = "true";
	if (selectedAttributesList[1] != undefined) {
		var selectedAttributesValue =  selectedAttributesList[1].split(",")[0];
		var requiredOutfitAttributes = $('#requiredOutfitAttributes_'+productId).val();
		var sizeAttributes= requiredOutfitAttributes.split('@');
		for (i = 0; i < sizeAttributes.length; i++) {
			if (sizeAttributes[i] == 'hemmingLength') {
				if ($('#chosenHemmingLength-'+productId).text() == '') {
					allAttributesSelected = "false";
		      		break;
				}
			} else {
		      	if (selectedAttributesValue.indexOf(sizeAttributes[i]) == -1) {
		      		allAttributesSelected = "false";
		      		break;
		      	}
	      	}
    	}
	} else {
		return false;
	}
    return allAttributesSelected;
}
// <<<<<<< .working
function detectCardTypeForCardNumber(e) {
	var cardNumber = $(e).val();
	var cardType = getCardType(cardNumber);
	$('#creditCardType').val(cardType);
}

function getCardType(number)
{
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null) {
    	showVisa();
        return "Visa";
     }   

    // Mastercard Range 1 prefix: 51-55
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) {
    	showMasterCard();
        return "MasterCard";
    } 
 	 
 	  // Mastercard Range 2 prefix: 22-27
 	 re = new RegExp("^2[2-7]");
		if (number.match(re) != null) {
			showMasterCard();
   		return "MasterCard";
      } 
       

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null) {
    	showAMEX();
        return "AmericanExpress";
	}

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65|64[4-9])");
    if (number.match(re) != null) {
     	showDiscover();
        return "Discover";
        
    }    

    // Diners
    re = new RegExp("^(30([0-5]|9)|36|38|39)");
    if (number.match(re) != null) {
     	showDinersClub();
        return "DinersClub";
	}

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null) {
    	showJCB();
        return "JCB";
     }   
	
	hideAllCards();
    return "";
}

function showCreditCardTypeImage(creditCardType) {
	if(creditCardType == 'MasterCard'){
		showMasterCard();
	} else if(creditCardType == 'Visa') {
		showVisa();
	} else if(creditCardType == 'AmericanExpress') {
		showAMEX();
	} else if(creditCardType == 'Discover') {
	   	showDiscover();
	} else if(creditCardType == 'DinersClub') {
		showDinersClub();
	} else if(creditCardType == 'JCB') {
		showJCB();
	} 
}

function showMasterCard(){
	$('.cc-brand-mastercard').show();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showVisa(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').show();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showAMEX(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').show();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showDiscover(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').show();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showDinersClub(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-jcb').hide();
	$('.cc-brand-dinersclubinternational').show();
}

function showJCB(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').show();
}

function hideAllCards(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showSelectedCartType(value){

if(value == 'MasterCard'){
   showMasterCard();
 } else if(value == 'Visa') {
   showVisa();
 } else if(value == 'AmericanExpress') {
   showAMEX();
 } else if(value == 'Discover') {
   showDiscover();
 } else if(value == 'DinersClub') {
   showDinersClub();
 } else if(value == 'JCB') {
  showJCB();
 } else {
   hideAllCards();
 }
 }
// =======
function detectCardTypeForCardNumber(e) {
	var cardNumber = $(e).val();
	var cardType = getCardType(cardNumber);
	$('#creditCardType').val(cardType);
}

function getCardType(number)
{
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null) {
    	showVisa();
        return "Visa";
     }   

    // Mastercard Range 1 prefix: 51-55
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) {
    	showMasterCard();
        return "MasterCard";
    } 
 	 
 	  // Mastercard Range 2 prefix: 22-27
 	 re = new RegExp("^2[2-7]");
		if (number.match(re) != null) {
			showMasterCard();
   		return "MasterCard";
      } 
       

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null) {
    	showAMEX();
        return "AmericanExpress";
	}

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null) {
     	showDiscover();
        return "Discover";
        
    }    

    // Diners
    re = new RegExp("^(30([0-5]|9)|36|38|39)");
    if (number.match(re) != null) {
     	showDinersClub();
        return "DinersClub";
	}

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null) {
    	showJCB();
        return "JCB";
     }   
	
	hideAllCards();
    return "";
}

function showCreditCardTypeImage(creditCardType) {
	if(creditCardType == 'MasterCard'){
		showMasterCard();
	} else if(creditCardType == 'Visa') {
		showVisa();
	} else if(creditCardType == 'AmericanExpress') {
		showAMEX();
	} else if(creditCardType == 'Discover') {
	   	showDiscover();
	} else if(creditCardType == 'DinersClub') {
		showDinersClub();
	} else if(creditCardType == 'JCB') {
		showJCB();
	} 
}

function showMasterCard(){
	$('.cc-brand-mastercard').show();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showVisa(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').show();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showAMEX(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').show();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showDiscover(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').show();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showDinersClub(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-jcb').hide();
	$('.cc-brand-dinersclubinternational').show();
}

function showJCB(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').show();
}

function hideAllCards(){
	$('.cc-brand-mastercard').hide();
	$('.cc-brand-visa').hide();
	$('.cc-brand-amex').hide();
	$('.cc-brand-discover').hide();
	$('.cc-brand-dinersclubinternational').hide();
	$('.cc-brand-jcb').hide();
}

function showSelectedCartType(value){

if(value == 'MasterCard'){
   showMasterCard();
 } else if(value == 'Visa') {
   showVisa();
 } else if(value == 'AmericanExpress') {
   showAMEX();
 } else if(value == 'Discover') {
   showDiscover();
 } else if(value == 'DinersClub') {
   showDinersClub();
 } else if(value == 'JCB') {
  showJCB();
 } else {
   hideAllCards();
 }
 }
// >>>>>>> .merge-right.r22954
