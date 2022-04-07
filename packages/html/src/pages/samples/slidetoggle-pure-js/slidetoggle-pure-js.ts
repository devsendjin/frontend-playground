// @ts-nocheck
import './slidetoggle-pure-js.scss';

document.addEventListener('DOMContentLoaded', function () {
  //subMenuMargins - summary of marginTop and marginBottom setted via css
  Element.prototype.slideDownUp = function (activeClass, subMenuMargins) {
    if (this.style.height) {
      this.style.height = '';
      this.parentNode.style.height = parseInt(this.parentNode.style.height) - this.scrollHeight - subMenuMargins + 'px';

      if (this.classList.contains('active')) {
        this.classList.remove('active');
      }
      return;
    }

    if (activeClass) {
      this.classList.add('active');
    }

    if (this.parentNode.classList.contains('active')) {
      this.parentNode.style.height = parseInt(this.parentNode.style.height) + this.scrollHeight + subMenuMargins + 'px';
      this.style.height = this.scrollHeight + 'px';
    } else {
      this.style.height = this.scrollHeight + 'px';
    }
  };

  [...document.querySelectorAll('.mobile-menu-toggler')].forEach((item) => {
    item.addEventListener('click', function () {
      item.classList.toggle('active');

      //25 - marginTop setted in css
      item.parentNode.nextElementSibling.slideDownUp('active', 25);
    });
  });
});
