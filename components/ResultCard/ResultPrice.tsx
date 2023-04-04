export const ResultPrice = ({ value, seekAttention, emptyPriceDemo }) => (
  <span
    className={seekAttention ? " animate-pulse" : ""}
  >
    {value}
    {emptyPriceDemo &&
      (
        <span className="w-12 h-12 absolute top-[20%] left-0 animate-fade-in-up">
          <img src="/click.svg" alt="Click" />
        </span>
      )}
  </span>
);
