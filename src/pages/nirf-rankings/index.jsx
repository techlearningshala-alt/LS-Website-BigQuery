export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/nirf-rankings/2025/",
      permanent: false,
    },
  };
}

export default function NirfRankingsIndex() {
  return null;
}
