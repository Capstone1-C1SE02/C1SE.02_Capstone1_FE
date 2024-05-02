function Label({ onClick }) {
  return (
    <div
      className="bg-label-bg fixed bottom-0 left-0 right-0 top-0 z-10"
      onClick={onClick}
    ></div>
  );
}

export default Label;
