type OutlineFunc = () => void;

const outline: OutlineFunc = () => {
  Array.from(document.querySelectorAll('*')).forEach(function (el) {
    (el as HTMLElement).style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16);
  });
};

export { outline };
