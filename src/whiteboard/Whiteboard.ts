export class Whiteboard {
  private ctx: CanvasRenderingContext2D;
  private width = 1920;
  private height = 1080;
  private x = -1;
  private y = -1;
  private lineWidth = 4;
  private transformScale = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.initContext(this.ctx);

    const canvas = this.ctx.canvas;
    canvas.width = this.width;
    canvas.height = this.height;
    this.transformScale = this.width / parseInt(canvas.style.width);

    canvas.addEventListener("pointerdown", (event) => {
      this.onMouseDown(event);
      canvas.addEventListener("pointermove", this.onMouseDownAndMove);
    });

    canvas.addEventListener("pointerup", (event) => {
      canvas.removeEventListener("pointermove", this.onMouseDownAndMove);
      this.ctx.stroke();
    });
  }

  initContext = (ctx: CanvasRenderingContext2D) => {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = "round";
  };

  onMouseDown = (event: PointerEvent) => {
    console.log(event.offsetX + " " + event.offsetY);
    this.x = event.offsetX;
    this.y = event.offsetY;
    this.ctx.fillRect(
      event.offsetX,
      event.offsetY,
      this.lineWidth,
      this.lineWidth
    );
  };

  onMouseDownAndMove = (event: PointerEvent) => {
    console.log(event.offsetX + " " + event.offsetY);
    this.ctx.setTransform(this.transformScale, 0, 0, this.transformScale, 0, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
    this.x = event.offsetX;
    this.y = event.offsetY;
  };

  reset = () => {
    this.ctx.reset();
    this.initContext(this.ctx);
  };
}
