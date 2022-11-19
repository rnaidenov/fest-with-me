export const handleKeyDown = (e, onSelect, onClose) => {
  if (e.key === 'Enter') {
    onSelect();
  }

  if (e.key === 'Escape') {
    onClose();
  }

  const suggestionsList = document.querySelectorAll('.suggestions li');
  
  let currActive = [...suggestionsList].indexOf(document.activeElement);
  const determineActive = (condition) => condition ? -suggestionsList.length + 1 : 1;

  if (e.key === 'ArrowDown') {
    currActive += determineActive(currActive === suggestionsList.length - 1)
  } else if (e.key === 'ArrowUp') {
    currActive -= determineActive(currActive === 0)
  }

  suggestionsList[currActive].focus()
}
