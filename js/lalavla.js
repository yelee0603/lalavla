$(function(){


    // 로그인----------------------------------------------------
    $('.btn-group #btn-user').click(function(){
        if($(this).hasClass('on')){
            $('.popup-mypage').show();
            $('.popup-login').hide();
        }else{
            $('.popup-login').show();
        }
    })

    // 모바일에서 로그인
    
    $(window).resize(function(){
        if($(window).width()<=767){
            $('.popup-login form button').click(function(){
                $('.menu-contents .log-out').hide();
                $('.menu-contents .log-in').show();
                $('.menu-contents .LI').hide();
                $('.menu-contents .MP').show();
            })
        }
    }).resize()
    


    $('.login-delete').click(function(){
        $('.popup-login').hide();
    })
    $('.popup-login form button').click(function(){
        $('.popup-login').hide();
        $('.btn-group #btn-user').addClass('on');
    })
    $('.mypage-delete').click(function(){
        $('.popup-mypage').hide();
    })
    $('.popup-mypage .logout').click(function(){
        $('.btn-group #btn-user').removeClass('on')
        $('.popup-mypage').hide();
        if($(window).width()<=767){
            $('.menu-contents .log-in').hide();
            $('.menu-contents .log-out').show();
            $('.menu-contents .MP').hide();
            $('.menu-contents .LI').show();
        }

    })
    
    //로그인, 마이페이지 팝업
    $(window).resize(function(){
        $('.menu-contents .my-page .LI').click(function(){
            $('.popup-login').show();
        })

        $('.menu-contents .my-page .MP').click(function(){
            $('.popup-mypage').show();
        })
    })

    // 검색창 -----------------------------------------------------
    var play;
    var clone=$('.popword ul').html();
    $('.search input').focus(function(){
        $('.search-tab').show();
        $('.search-tab').after('<div class="popup-bg"></div>');
        $('.search').addClass('focus');
        // 모바일 사이즈일때 퀵메뉴 안보이게하기
        if($(window).width()<=767){
            $('.quick-menu').css('display','none');
            if($('.search-tab').show()){
                $('.search').css({'z-index':'10000','position':'fixed','left':'50%','transform':'translateX(-50%)','width':'70%'});
            }else{
                $('.search').removeAttr();
            }
            $('.search').removeClass('focus');
        }
        play=setInterval(move, 2000);
    })

    //인기검색어 롤링
    if($(window).width()>767){
        function move(){
            $('.popword ul li').first().slideUp(function(){
                $(this).appendTo('.popword ul').show();
            });
        }
    
        $('.popword ul').on({
            mouseenter:function(){
                clearInterval(play);
            },
            mouseleave:function(){
                play=setInterval(move, 2000);
            }
        })
    }
    

    //검색창 초기화
    $('body').on('click','.popup-bg',function(){               
        $('.search-tab').hide();
        $('.popup-bg').remove();
        $('.search').removeClass('focus');
        play=clearInterval(play);
        $('.search-tab #popword ul').empty().append(clone);
    })


    // 모바일에서 닫기
    $('.search-tab .btn-del').click(function(){
        $('.search-tab').hide();
        $('.quick-menu').show();
        $('.search').removeAttr("style");
    })


    // 모바일 검색창 팝업의 검색창 탭하기
    $(window).resize(function(){
        if($(window).width()<=767){
            $('.search-nav a').click(function(e){
                e.preventDefault();
                $('.search-nav a').removeClass('active');
                $(this).addClass('active');
                var id=$(this).attr('href');
                $('.search-contents .content').hide();
                $(id).show();
            })
        }
    }).resize()
    

    //최근검색어 값 넣기
    $('#add').click(function(){
        var value = $('.search input').val();
        if($('.search input').val().length>0){
            $('#keyword ul').append(`
            <li>
            <a href="#">${value}</a>
            <button class="icon icon-del"></button>
            </li>
            `);
            if($('#keyword li').length==0){
                $('#keyword').append('<p>최근검색어가 없습니다.</p>');
            }
            else{
                $('#keyword p').remove();
            }
        }
        $('form input').val('');
        
    })
    
    $('#keyword ul').on('click','button',function(e){
        e.preventDefault();
        $(this).parent('li').remove();
        if($('#keyword li').length==0){
            $('#keyword').append('<p>최근검색어가 없습니다.</p>');
        }
        
    })
    

    // 최근검색어 삭제
    $('#keyword ul li button').click(function(){
        $(this).parent().remove();
        if($('#keyword li').length==0){
            $('#keyword').append('<p>최근검색어가 없습니다.</p>');
        }
    })

    //최근검색어 전체삭제
    $('.del-all').click(function(){
        $('#keyword ul li').remove();
        if($('#keyword li').length==0 && $('#keyword p').length==0){
            $('#keyword').append('<p>최근검색어가 없습니다.</p>');
        }
    })

    if($(window).width()<=767){
        conUlHeight();
        var contentH;
        var conNavH;
        var conBotH;
        var conUlH;

        function conUlHeight(){
            contentH=$('.search-tab').outerHeight();
            conNavH=260
            conBotH=$('.keyword .del-all').height();
            conUlH=contentH-(conNavH+conBotH);
            console.log(contentH, conNavH, conBotH, conUlH);
            
            
            $('.keyword').find('ul').height(conUlH);
        }
    }

    // 모바일 스와이프
    var tabSwiper;
    function swiperInit(){
        // 네비게이션 탭메뉴 스와이프
        tabSwiper= new Swiper('.gnb', {
            slidesPerView: 3,
            spaceBetween: 10,
            pagination: {
                el: '.gnb .swiper-pagination',
                clickable: true,
                },
        });
        // best 탭메뉴 스와이프 
        bestTabSwiper= new Swiper('.tab-menu', {
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: {
                el: '.tab-menu .swiper-pagination',
                clickable: true,
                },
        });
    }
        $(window).resize(function(){                
            if($(window).width()<=767){
                if(tabSwiper==undefined){
                    swiperInit();              
                    console.log('최초생성');
                }else{
                    tabSwiper.update();
                    bestTabSwiper.update();
                    console.log('swiper update');
                } 
                if(tabSwiper.destroyed){
                    swiperInit();
                    console.log('다시 객체생성');
                }                    
            }else{
                console.log('pc');
                
                if(tabSwiper!=undefined){
                    tabSwiper.destroy();
                    bestTabSwiper.destroy();
                    console.log('객체생성파괴');
                }                                   
            }
            
        }).resize();

    //토글메뉴버튼---------------------------------------------
    $(window).resize(function(){
        $('.menu-btn, .depth1 a').off('click');
        if($(window).width()<=767){
            $('.top-area .menu-btn').removeClass('pc')
            $('.top-area .menu-btn').addClass('mo')
            //mobile용
            $('.menu-btn.mo').click(function(){
                $('.menu-popup').show();//모바일 팝업
                $('.quick-menu').hide();//퀵메뉴
                $('.menu-pc').hide();//피시 메뉴
            })
        }
        else if($(window).width()>767){
            $('.top-area .menu-btn').addClass('pc')
            $('.top-area .menu-btn').removeClass('mo')
            $('.depth1 a').click(function(){
                $('.sub').removeClass('active');
                $(this).next().addClass('active');
            })        
            //pc용
            $('.menu-btn.pc').click(function(){
                $('.menu-pc').show();//피시 메뉴
                $('.menu-pc .depth1').toggleClass('active');
                $('.menu-popup').hide();//모바일 팝업
            })
        }
        
    }).resize()    
   
    
    // 메뉴 아이콘 바꾸기
    $('.menu-popup .depth1 .title').click(function(e){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).next().slideUp();
        }else{
            $('.menu-popup .depth1 .title').removeClass('active');
            $('.depth1 .sub').slideUp();
            $(this).addClass('active');
            $(this).next().slideDown();
        }
        e.preventDefault();
    })
    
    //모바일 메뉴팝업 높이구하기
    if($(window).width()<=767){
        menuHeight();

        var windowH;
        var userH;
        var topNavH;
        var menuH;

        $(window).resize(function(){
            menuHeight();
        }).resize();

        function menuHeight(){
            windowH=$(window).height();
            userH=$('.menu-contents .user-info').outerHeight();
            topNavH=$('.menu-contents').find('.top-nav').outerHeight();
            menuH=windowH-(userH+topNavH);

            $('.menu-contents .menu').height(menuH);
        }
    }


    //모바일 메뉴팝업 닫기
    $('.menu-popup .btn-del').click(function(){
        $('.menu-popup').hide();
        $('.quick-menu').show();
    })


    //슬라이드-------------------------------------------------
    //메인

    var swiper = new Swiper('.slide', {
        pagination: {
            el: '.slide .swiper-pagination',
            clickable:true,
        },
        navigation: {
            nextEl: '.slide .swiper-button-next',
            prevEl: '.slide .swiper-button-prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        on:{//사용자가 슬라이드 화면을 터치형식으로 넘길때 재생아이콘으로 변경
            sliderMove:function(){
                $('#playStop i').removeClass('icon-stop').addClass('icon-play');
            }
        },
        effect:'fade',
        loop:true
    });

    $('.swiper-container a').click(function(e){
        e.preventDefault();
    })
    $('#top-banner button').click(function(){
        $('#top-banner').slideUp();
    })
    //이전다음버튼 또는 페이지네이션을 눌렀을 때 재생정지버튼을 재생상태로 변경
    $('.swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet').click(function(){            
        $('#playStop i').removeClass('icon-stop').addClass('icon-play');
    })
    //재생 정지버튼의 위치 잡기 
    var paginationW=$('.swiper-pagination').width();
    console.log('페이지네이션 전체 넓이',paginationW);
    $('#playStop').css('margin-left',(paginationW/2)+15);
    $('#playStop').click(function(){
        if($(this).find('i').hasClass('icon-stop')){
            swiper.autoplay.stop();
            $(this).find('i').removeClass('icon-stop').addClass('icon-play');
        }else{
            swiper.autoplay.start();
            $(this).find('i').removeClass('icon-play').addClass('icon-stop');
        }
    })
    
    //이벤트
    var eventSwiper = new Swiper('.event', {
        pagination: {
          el: '.event .swiper-pagination',
          clickable:true,
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: true,
        },
    });

    //퀵메뉴------------------------------------------------------------
    // 퀵메뉴 스크롤 따라다니기
    var scrollTop;
    $(window).scroll(function(){        
        scrollTop = $(document).scrollTop()+200;
        if (scrollTop < 880) {
            scrollTop = 880;
        }    
        if($(window).width()>767){                                
            $(".quick-menu").stop().animate( { "top" : scrollTop },500);    
        }   
    }).scroll();

    $(window).resize(function(){
        if($(window).width()<=767){          
            $(".quick-menu").removeAttr('style');                        
        }     
    }).resize();

    // 위로가기
    $('#go-top').click(function(){
        $('html').scrollTop(0);
    })

    //장바구니---------------------------------------
        //위시리스트, 장바구니 추가
        $('.hover button').click(function(e){
            e.preventDefault();
            var key=$(this).parents('li').data('key');
            var imgSrc=$(this).parents('li').find('img').attr('src'); 
            var brand=$(this).parents('li').find('dt').text();
            var name=$(this).parents('li').find('.name').text();
            var price=$(this).parents('li').find('.price').html();
            // console.log(key, imgSrc, brand, name, price);

            if(!$(this).hasClass('on')){
                $(this).addClass('on');
                if($(this).hasClass('icon-hover-cart')){
                    alert('장바구니에 담았습니다.');
                    $('#cart ul').append(
                    `<li data-key="${key}">
                        <label><input type="checkbox"></label>
                        <img src="${imgSrc}" alt="">
                        <dl>
                            <dt>${brand}</dt>
                            <dd>${name}</dd>
                            <dd>${price}</dd>                        
                        </dl>
                        <div class="count">
                            <button class="icon icon-minus down"></button>
                            <span class=button>1</span>
                            <button class="icon icon-plus up"></button>
                        </div>
                    </li>`                                         
                    );
                }else{
                    alert('찜했습니다.');
                    $('#like ul').append(
                    `<li data-key="${key}">
                        <img src="${imgSrc}" alt="">
                        <div class="like-del"><i class="icon icon-del"></i></div>
                        <dl>
                            <dt>${brand}</dt>
                            <dd>${name}</dd>
                        </dl>
                    </li>`);
                }
            }else{
                alert('이미 담겨져 있습니다.');
            }
        })


    // 장바구니 열기, 닫기
    $('.tab-nav .click').click(function(){        
        if($('.quick-menu-all').css('display')=='block'){
            // console.log('열려있음');
            $('.quick-menu-all').hide();
            $('.quick-bg').remove();
        }else{
            // console.log('닫혀있음');
            $('.quick-menu-all').show();
            $('.quick-menu').after('<div class="quick-bg"></div>');
        }
        // 탭메뉴의 컨텐츠가 변경될때마다 ul의 높이 구하기
        ulHeight();
    })


    // 모바일 장바구니 닫기
    $('.all-del').click(function(){
        $('.quick-menu-all').hide();
        $('.quick-bg').remove();
    })



    // 카트아이콘 누르면 카트활성화
    $('#quick-cart').click(function(){
        $('#cart').show();
        $('#like').hide();
        $('.cart-nav').addClass('active')
        $('.like-nav').removeClass('active')
        })

    // 하트아이콘 누르면 찜활성화
    $('#quick-like').click(function(){
        $('#cart').hide();
        $('.cart-nav').removeClass('active')
        $('.like-nav').addClass('active')
        $('#like').show();
    })

    // 나머지부분 누르면 닫히기
    $('body').on('click','.quick-bg',function(){               
        $('.quick-menu-all').hide();
        $('.quick-bg').remove();
    })

    // 폴드 아이콘을 누르면 접히기
    $('.fold').click(function(){
        $('.quick-menu-all').hide();
        $('.quick-bg').remove();
    })

    // ul의 높이 구하기
    var navH;
    var tabH;
    var topH;
    var bottomH;
    var cartulH;
    var likeulH;

    $('.quick-menu-all').resize(function(){
        ulHeight();
    }).resize();


    function ulHeight(){
        navH=$('.quick-menu-all').height();
        tabH=$('.quick-menu-nav').height();
        topH=$('.tab-contents .content').find('.top').height();
        bottomH=$('.tab-contents .content').find('.bottom').height();        
        cartulH=navH-(tabH+topH+bottomH);
        likeulH=navH-tabH;
        // console.log(navH,tabH,topH,bottomH,cartulH,likeulH);
        $('.tab-contents #cart').find('ul').height(cartulH);
        $('.tab-contents #like').find('ul').height(likeulH);
    }

    // 탭컨텐츠 바꾸기
    $('.quick-menu-nav a').click(function(e){
        e.preventDefault();
        $('.quick-menu-nav a').removeClass('active');
        $(this).addClass('active');
        var id=$(this).attr('href');
        $('.tab-contents .content').hide();
        $(id).show();
    })

    // like-del누르면 삭제
    $('.tab-contents').on('click','.like-del',function(){
        var key=$(this).parents('li').data('key');
        // console.log('삭제할 항목',key);
        var contentsName=$(this).parents('.content').attr('id');
        $(this).parents('li').remove();
        console.log(contentsName, key);
        
        $('.contents li').each(function(){
            //$(this) => .item li
            //팝업창 안에 있는 체크된 리스트의 키값과 상품목록(.item)에 있는 리스트의 키값이 일치할 경우
            if($(this).data('key')==key){
                if(contentsName=='like'){
                    $(this).find('.icon-hover-like').removeClass('on');
                }
                else if(contentsName=='cart'){
                    $(this).find('.icon-hover-cart').removeClass('on');
                }
            }
        })
    })

    //선택한 리스트 전체삭제 
    $('.bottom .btn-del').click(function(){
        var checkCount=0;
        var contentsName=$(this).parents('.content').attr('id');
        $(this).parents('.content').find('li input').each(function(){
            //$(this) => 리스트 안에 있는 체크박스의 상태
            if($(this).prop('checked')){
                checkCount++;
                var key=$(this).parents('li').data('key');
                
                $('.contents li').each(function(){
                    if($(this).data('key')==key){
                        if(contentsName=='cart'){
                            $(this).find('.icon-hover-cart').removeClass('on');
                        }
                    }
                })
                // 체크되어진 리스트 삭제
                $(this).parents('li').remove();
            }
        })
        if(checkCount==0){
            alert('삭제할 상품을 선택하세요.');
        }
    })

    //전체선택(체크박스)
    $('.content .top input').change(function(){
        if($(this).prop('checked')){
            $('#cart li input').prop('checked', true);
            
        }else{
            $('#cart li input').prop('checked', false);
        }
    })

    //개별체크박스 선택
    $('.content').on('change','li input',function(){
        $(this).parents('.content').find('.top input').prop('checked',false);
    })


    //수량
    $('.content').on('click','.count button',function(){
        var count=$(this).siblings('span').text(); 
        if($(this).hasClass('down')){
            count--;
            if(count<1){
                alert('최소 수량입니다.');
                count=1;
            }
        }else{
            count++;
            if(count>10){
                alert('최대 수량입니다.');
                count=10;
            }
        }
        $(this).siblings('span').text(count); 
    })


    //탭메뉴-----------------------------------------------
    $('.tab-menu li a').click(function(e){
        e.preventDefault();
        $('.best .tab-menu li a').removeClass('active');
        $(this).addClass('active');
        var id=$(this).attr('href');
        $('.best .contents ul').hide();
        $(id).show();
    })


    //패밀리사이트-----------------------------------------
    $('.select-wrap button').click(function(){ 
        if($(this).next().css('display')!='block'){
            console.log('펼쳐져있지 않음');                    
            $('.select-wrap ul').slideUp();
            $(this).next().slideDown();
        }else{
            $(this).next().slideUp();
        }                
    })


    // 눌러도 위로 이동하지 않기
    $('.contents .wrap a').click(function(){
        return false;
    })


    // footer
    $(window).resize(function(){
        if($(window).width()<=767){
            $('.footer li').hide().slice(0,3).show();
        }else{
            $('.footer li').show();
        }
    }).resize()

    //map
    var mapContainer = document.getElementById('map'),
        mapOption = { 
            center: new kakao.maps.LatLng(37.558262, 126.937061),
            level: 3
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 마커를 표시할 위치입니다 
    var position =  new kakao.maps.LatLng(37.558262, 126.937061);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: position,
        clickable: true
    });

    marker.setMap(map);
    
    var iwContent = '<div style="padding:3px;">랄라블라 신촌대로점</div>', 
        iwRemoveable = true;

    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);  
    });
})
