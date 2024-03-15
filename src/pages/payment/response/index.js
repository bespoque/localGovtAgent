import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = ({ msg }) => {
  const router = useRouter();

  let res = msg.msg;

  useEffect(() => {
    if (res === 'success') {
      alert('Payment successful. Thanks for paying your tax.');
    } else if (res === 'failed') {
      alert('There was an error. Please try again after some time');
    }

    router.push('/dashboard');
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};

export async function getServerSideProps(res) {
  const msg = res.query;
  return {
    props: {
      msg,
    },
  };
}

export default Index;
