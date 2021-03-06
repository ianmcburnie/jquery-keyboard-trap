/**
* @file jQuery singleton traps keyboard focus cycle within given element's interactive children
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 1.0.1
* @requires jquery
* @requires jquery-focusable
*/
(function($, window, document, undefined) {
    var pluginName = 'jquery-keyboard-trap'; // eslint-disable-line no-unused-vars

    var trapTemplate = '<div tabindex="0" class="keyboard-trap-boundary">';
    var $topTrap = $(trapTemplate);
    var $outerTrapBefore = $(trapTemplate);
    var $innerTrapBefore = $(trapTemplate);
    var $innerTrapAfter = $(trapTemplate);
    var $outerTrapAfter = $(trapTemplate);
    var $botTrap = $(trapTemplate);
    var $trap;
    var $firstTabElement;
    var $lastTabElement;

    function setFocusToFirstFocusableElement() {
        $firstTabElement.focus();
    }

    function setFocusToLastFocusableElement() {
        $lastTabElement.focus();
    }

    $topTrap.on('focus', setFocusToFirstFocusableElement);
    $outerTrapBefore.on('focus', setFocusToFirstFocusableElement);
    $innerTrapBefore.on('focus', setFocusToLastFocusableElement);
    $innerTrapAfter.on('focus', setFocusToFirstFocusableElement);
    $outerTrapAfter.on('focus', setFocusToLastFocusableElement);
    $botTrap.on('focus', setFocusToLastFocusableElement);

    /**
    * @method "jQuery.trapKeyboard"
    * @param {Object} [options]
    * @fires keyboardTrap - when trap is activated
    * @fires keyboardUntrap - when trap is deactivated
    * @return {Object} chainable jQuery class
    */
    $.trapKeyboard = function trapKeyboard(el) {
        var $focusable;

        $.untrapKeyboard();

        $trap = $(el);
        $focusable = $trap.focusable();
        $firstTabElement = $focusable.first();
        $lastTabElement = $focusable.last();

        $('body').prepend($topTrap);

        $outerTrapBefore.insertBefore($trap);
        $trap.prepend($innerTrapBefore);
        $trap.append($innerTrapAfter);
        $outerTrapAfter.insertAfter($trap);
        $('body').append($botTrap);

        $trap.addClass('keyboard-trap--active');
        $trap.trigger('keyboardTrap');

        return $trap;
    };

    $.untrapKeyboard = function untrapKeyboard() {
        if ($trap !== undefined) {
            $topTrap.detach();
            $outerTrapBefore.detach();
            $innerTrapBefore.detach();
            $innerTrapAfter.detach();
            $outerTrapAfter.detach();
            $botTrap.detach();

            $trap.off('focusExit');
            $trap.removeClass('keyboard-trap--active');
            $trap.trigger('keyboardUntrap');
        }
        return $trap;
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* keyboardTrap event
*
* @event keyboardTrap
* @type {object}
* @property {object} event - event object
*/

/**
* keyboardUntrap event
*
* @event keyboardUntrap
* @type {object}
* @property {object} event - event object
*/
