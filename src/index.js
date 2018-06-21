import io from 'socket.io-client';
import Controller from './js/Controller';
import './styles/main.css';

const socket = io();
const carElem = document.getElementById('car');
const controller = new Controller();
controller.init();

socket.on('drive a car', direction => {
  const carStyle = getComputedStyle(carElem);

  if (direction === 'top') {
    carElem.style.top = `${parseFloat(carStyle.top) - 30}px`;
  } else if (direction === 'left') {
    carElem.style.left = `${parseFloat(carStyle.left) - 30}px`;
  } else if (direction === 'bottom') {
    carElem.style.top = `${parseFloat(carStyle.top) + 30}px`;
  } else if (direction === 'right') {
    carElem.style.left = `${parseFloat(carStyle.left) + 30}px`;
  }

  return false;
});
