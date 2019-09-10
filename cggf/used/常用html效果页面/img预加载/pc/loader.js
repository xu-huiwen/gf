var preloader = {
    disable: undefined,
    start: undefined,
    onLoad: function() {},
    $slide: undefined,
    visuals: undefined,
    fillVisuals: function() {},
    fillingTime:500,
    delayBeforeLoadCheck: 0
};

preloader.fillVisuals = function(fillAmount, callback) {
    if (!callback) callback = function() {};
    $(function() {
        preloader.visuals.loaded.animate({
                'width': 370*fillAmount
            }, {
                duration: preloader.fillingTime,
                queue: false,
                complete: callback
            });
    });

}

preloader.disable = function(param) {
    if (param && param.rough) {
        preloader.$slide.remove();
    } else {
        preloader.$slide.animate({
            'opacity': 0
        }, preloader.fillingTime, function() {
            $(this).remove();
        });
    }
    $(document.body).removeClass('unloaded');
}

preloader.init = function() {
    preloader.visuals = {
        loaded: $('#loader .starting'),
        unloaded: $('#loader .ending')
    };
    preloader.$slide = $('#loader');
}

preloader.start = function() {
    preloader.init();
    var $media = $('html').find('img');
    var mediaCount = $media.length;
    var local_onContentLoad = this.onContentLoad;
    var loaded = 0;
    preloader.visuals.loaded.add(preloader.visuals.unloaded).css('opacity', 0);

    function getFilesToLoadCount() {
        var a = $media.filter(function() {
            if (this.src && this.src.indexOf('svg') > -1) {
                return false;
            } else if (this.readyState !== undefined && this.readyState >= 3) {
                return false;
            } else if (this.complete) {
                return false;
            }
            return true;

        });
        return a.length;
    }

    setTimeout(earlyCachedDetection, preloader.delayBeforeLoadCheck);

    function earlyCachedDetection() {
        var alreadyLoaded = getFilesToLoadCount();
        if (alreadyLoaded == 0) {
            preloader.onLoad();
            preloader.disable({
                'rough': true
            });
            return;

        } else {
            preloader.visuals.loaded.add(preloader.visuals.unloaded).animate({
                'opacity': 1
            }, 300);
            samA();
        }
    }

    function samA() {

        var notLoaded = getFilesToLoadCount();

        var loadedPart = (mediaCount - notLoaded) / mediaCount;

        if (notLoaded == 0) {
            preloader.fillVisuals(loadedPart, preloader.onLoad);

        } else {
            setTimeout(samA, 1000);
            preloader.fillVisuals(loadedPart);

        }
    }
}