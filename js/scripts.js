include('js/jquery.easing.1.3.js');
include('js/jquery-ui-1.8.11.custom.min.js');
include('js/jquery.transform-0.9.3.min.js');
include('js/jquery.animate-colors-min.js');
include('js/jquery.backgroundpos.min.js');
include('js/mathUtils.js');
include('js/superfish.js');
include('js/switcher.js');
include('js/jquery.mousewheel.js');
include('js/sprites.js');
include('js/forms.js');
include('js/hoverSprite.js');
include('js/googleMap.js');
include('js/spin.js');
include('js/jquery.fancybox-1.3.4.pack.js');
include('js/uScroll.js');
//----Include-Function----
function include(url){ 
  document.write('<script src="'+ url + '" type="text/javascript"></script>'); 
}
//--------global-------------
var isSplash = true;
var isAnim = true;
var spinner;
var mapSpinner;
var MSIE = ($.browser.msie) && ($.browser.version <= 8)

//------DocReady-------------
$(document).ready(function(){ 
    if(location.hash.length == 0){
        location.hash="!/"+$('#content > ul > li:first-child').attr('id');
    }
    ///////////////////////////////////////////////////////////////////
        loaderInit();
function loaderInit(){
        var opts = {
              lines: 9,
              length: 0, 
              width: 20, 
              radius: 22, 
              rotate: 0, 
              color: '#fff', 
              speed: 1.7, 
              trail: 0, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target = $(".page_spinner > span");
        spinner = new Spinner(opts).spin();
        target.append(spinner.el) 
        ///////////////////////////////////////
            var opts2 = {
              lines: 12,
              length: 6, 
              width: 3, 
              radius: 8, 
              rotate: 0, 
              color: '#fff', 
              speed: 1.3, 
              trail: 60, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target2 = $(".google_map > span");
        mapSpinner = new Spinner(opts2).spin();
        target2.append(mapSpinner.el)          
} 
///////////////////////////////////////////////////////////////////

     $('ul#menu').superfish({
          delay:       500,
          animation:   {height:'show'},
          speed:       600,
          autoArrows:  false,
         dropShadows: false,
         	onInit: function(){
  				$("#menu > li > a").each(function(index){
  					var conText = $(this).find('.mText').text();
                    // $(this).append("<div class='_area'></div><div class='mTextOver'>"+conText+"</div>"); 
                    $(this).append("<div class='_area'></div><div class='mText_over'>"+conText+"</div>");   
  				})
  	 		}
        });
});
  
 //------WinLoad-------------  
$(window).load(function(){  

//$(".followHolder > ul > li > a").hoverSprite({onLoadWebSite: true});
$(".more").hoverSprite({onLoadWebSite: true});
$(".downScroll").hoverSprite({onLoadWebSite: true});
$(".upScroll").hoverSprite({onLoadWebSite: true});
$('.mText_over').sprites({method:'gStretch'});


$('.scroll1')
		.uScroll({			
			mousewheel:true
			,step:100
		})


$('.pic').fancybox({'titlePosition': 'inside', 'overlayColor':'#000'}); 
$('.zoomSp').fadeTo(500, 0)
    $('.zoomSp').hover(function(){ $(this).stop().fadeTo(500, 0.6)	}, function(){$(this).stop().fadeTo(500, 0)})
  
  
  $(".followHolder > ul > li").hover(
    function(){
        $(this).find('a').stop().animate({top:"8px"}, 300, 'easeOutCubic');
    },
    function(){
        $(this).find('a').stop().animate({top:"0px"}, 300, 'easeOutCubic');
    }
  )
  
       
var menuItems = $('#menu >li'); 

var currentIm = 0;
var lastIm = 0;

//setTimeout(navInit, 3000)
navInit();
function navInit(){

}

///////////////////////////////////////////////
    var navItems = $('.menu > ul >li');

   // $('.menu > ul >li').eq(0).css({'display':'none'});
	var content=$('#content'),
		nav=$('.menu');

    	$('#content').tabs({
		preFu:function(_){
			_.li.css({left:"-1700px",'display':'none'});
		}
		,actFu:function(_){			
			if(_.curr){
				_.curr.css({'display':'block', left:'1700px'}).stop().delay(400).animate({left:"0px"},700,'easeOutCubic');
                
                cont_resize(_.n);
                if ((_.n == 0) && ((_.pren>0) || (_.pren==undefined))){splashMode();}
                if (((_.pren == 0) || (_.pren == undefined)) && (_.n>0) ){contentMode(); }
            }
			if(_.prev){
			     _.prev.stop().animate({left:'-1700px'},700,'easeInOutCubic',function(){_.prev.css({'display':'none'});} );
             }
		}
	})
    

    function splashMode(){
        isSplash = true;
        
         $("#menu > li").each( function(index){
            _delay = (index*100)+200;
          
         });
         
    
    }
    
    function contentMode(){  
        isSplash = false;

    }
    
    function cont_resize(_page){
        var li_W = $('#content > ul > li').eq(_page).height();
      
        if(li_W < 520){li_W = 520}
            $('#content').stop().animate({height:li_W+"px"}, 600, 'easeInOutCubic', function(){centrRepos();} ).css({'overflow':'visible'}) 
    }		
    
    
	nav.navs({
			useHash:true,
             hoverIn:function(li){
                $(".mText_over", li).stop(true).animate({top:'-50px'}, 400, 'easeOutCubic');
             },
                hoverOut:function(li){
                    if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                          $(".mText_over", li).stop(true).animate({top:'-150px'}, 400, 'easeInOutCubic');   
                    } 
                } 
		}).navs(function(n){			
			$('#content').tabs(n);
		})

//////////////////////////////////////////
    
   	var h_cont;
  
	function centrRepos() {
         h_cont = $('.center').height();
         $('body').animate({'min-height':h_cont+100+'px'},400)
		var h=$(window).height();
		if (h>(h_cont+40)) {
			m_top=~~(h-h_cont)/2;
			h_new=h;
		} else {
			m_top=20;
			h_new=h_cont+40;
		}
        if(m_top<90){m_top=90}
		$('.center').stop().animate({'margin-top':m_top},600,'easeOutCubic');

	}
	centrRepos();
    ///////////Window resize///////
    
    function windowW() {
        return (($(window).width()>=parseInt($('body').css('minWidth')))?$(window).width():parseInt($('body').css('minWidth')));
    }
    
    
	$(window).resize(function(){
        centrRepos();
         
        }
    );

    } //window function
) //window load