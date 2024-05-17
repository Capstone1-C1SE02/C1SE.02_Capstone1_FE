function Label({ onClick }) {
  return (
    <div
      className="animation fixed bottom-0 left-0 right-0 top-0 z-10 bg-label-bg"
      onClick={onClick}
    ></div>
  );
}

export default Label;
