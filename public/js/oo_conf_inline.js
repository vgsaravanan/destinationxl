/*
OnlineOpinion v5.6.3
Released: 9/11/2012. Compiled 09/11/2012 09:48:29 AM -0500
Branch: master 0fe04619dd3f8a968862309dc094d4d4e3c8a9ed
Components: Full
The following code is Copyright 1998-2012 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/

var oo_feedback;
setTimeout(function(){
/* Inline configuration */
  oo_feedback = new OOo.Ocode({
	  customVariables: {
	    cm_client_id: typeof $cm_client_id !== 'undefined' ? $cm_client_id : ''
//		, email: 'value'
//		, loyaltyTier: 'value'
	  }
  });
},1000);
 
/*
INLINE FEEDBACK LINK EXAMPLE
<a href="javascript:void(0);" onClick="oo_feedback.show()"><img src="/onlineopinionV5/oo_icon.gif" border="0" title="Feedback"> Feedback</a>
*/