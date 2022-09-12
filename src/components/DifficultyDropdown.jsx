const DifficultyDropdown = ({ difficulty, changeDifficulty }) => {
  return (
    <div className="justify mb-10 flex items-center gap-2 self-center">
      <label
        htmlFor="keyboards"
        className="block font-mono text-base text-kinda-teal dark:text-pale-gold"
      >
        Difficulty:
      </label>
      <select
        value={difficulty}
        className="rounded-lg border bg-darker-beige p-1 text-dark-navy dark:bg-lighter-purple dark:text-pale-gold dark:focus:border-blood-red dark:focus:ring-blood-red"
        onChange={(event) => changeDifficulty(event.currentTarget.value)}
      >
        <option value="normal">Standard</option>
        <option value="hard">Complex</option>
      </select>
    </div>
  );
};

export default DifficultyDropdown;
