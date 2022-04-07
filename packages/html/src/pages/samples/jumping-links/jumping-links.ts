import './jumping-links.scss';

document.addEventListener('DOMContentLoaded', () => {
  const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.jump');
  const slider = document.querySelector('.toggle') as HTMLDivElement;

  window.addEventListener('load', () => {
    const firstLink = links[0].getBoundingClientRect();
    slider.style.transform = `translate(${firstLink.x}px, ${firstLink.y}px)`;
    slider.style.width = `${firstLink.width}px`;
    slider.style.height = `${firstLink.height}px`;
  });

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });

    link.addEventListener('mouseover', function () {
      const link = this.getBoundingClientRect();

      slider.style.transform = `translate(${link.x}px, ${link.y}px)`;
      slider.style.width = `${link.width}px`;
      slider.style.height = `${link.height}px`;
    });
  });
});
