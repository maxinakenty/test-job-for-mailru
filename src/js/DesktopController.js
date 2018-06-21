import socket from './common';

class DesktopController {
  static handleKeyDown = () => {
    document.body.addEventListener(
      'keydown',
      e => {
        const code = e.keyCode;

        if (code === 37) {
          socket.emit('drive a car', 'left');
        }

        if (code === 38) {
          socket.emit('drive a car', 'top');
        }

        if (code === 39) {
          socket.emit('drive a car', 'right');
        }

        if (code === 40) {
          socket.emit('drive a car', 'bottom');
        }
      },
      false,
    );
  };

  init() {
    this.constructor.handleKeyDown();
  }
}

export default DesktopController;
