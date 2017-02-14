/**
 * Created by mitsuhiroinomata on 2016/11/11.
 */

function DonutsCanvas(){
    /// @type {Canvas}
    this.canvas = null;
    /// @type {String}
    this.emptyColor = null;
    ///
    this.applyColor = function(){ return null };

    /// 0 ~ 1.0
    this.ratio = 0.0;

    /// draw
    this.draw = function(){
        if (!this.canvas || !this.canvas.getContext) {
            return false;
        }

        var ratio = this.ratio;

        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width, canvas.height);

        var color = (this.applyColor).bind(this)();

        var drawDonutImpl = function(ctx, ratio, color) {
            var length = Math.min(canvas.width, canvas.height) / 2;
            var center = {x: canvas.width / 2, y: canvas.height / 2 };
            var innerLength = length * 0.7; // inner circle length.

            // console.log("color: " + color + ", ratio:"+ratio);

            var originRadian = -Math.PI / 2;
            var startAngle = originRadian;

            ctx.fillStyle = color;

            // draw 2 half donut to make full size donut ( to prevent from filling inner circle on specific old smartphone browser.)
            // draw first part of a donut.
            ctx.beginPath();
            var endAngle = Math.PI * 2 * Math.min(ratio, 0.5) + originRadian;
            ctx.arc(center.x, center.y, innerLength, startAngle, endAngle, false);
            ctx.arc(center.x, center.y, length, endAngle, startAngle, true);
            ctx.closePath();
            ctx.fill();

            if(ratio > 0.5) {
                // draw rest one.
                ctx.fillStyle = color;
                ctx.beginPath();
                var startAngle2 = Math.PI * 2 * 0.5 + originRadian;
                var endAngle = Math.PI * 2 * ratio + originRadian;
                ctx.arc(center.x, center.y, innerLength, startAngle2, endAngle, false);
                ctx.arc(center.x, center.y, length, endAngle, startAngle2, true);
                ctx.closePath();
                ctx.fill();
            }
        }; // .bind(this);

        // // fill empty color donut.
        drawDonutImpl(ctx, 1, this.emptyColor);

        // // fill ratio color donut arc.
        drawDonutImpl(ctx, ratio, color);
    }.bind(this);

}

var foo = new DonutsCanvas();

