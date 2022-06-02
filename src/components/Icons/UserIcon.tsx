interface Prop {
  color: string;
}

const UserIcon = (color: Prop): JSX.Element => {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${color.color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
};

export default UserIcon;
