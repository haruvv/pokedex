import { Haedline } from '@/components/Headline';
import { Links } from '@/components/Links';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Haedline
        title="about Page"
        number={11111}
        array={['1', '2', 'S']}
        obj={{ foo: 'foo', key: 'key', id: 1 }}
        boo={true}
        cmp={<p>foo</p>}
      />
      <Links />
    </main>
  );
}
