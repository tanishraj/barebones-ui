import { useState } from 'react';

import { Swap } from '@/components';

export const SwapDocs = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold'>Swap Component</h1>

      {/* Introduction */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>Introduction</h2>
        <p className='text-base-content'>
          The <code className='text-accent'>Swap</code> component is a versatile
          UI element that allows you to toggle between two states with
          animations. It supports two animation types:{' '}
          <code className='text-accent'>rotate</code> and{' '}
          <code className='text-accent'>flip</code>.
        </p>
      </section>

      {/* Basic Usage */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>Basic Usage</h2>
        <p className='mb-4 text-base-content'>
          Here's an example of how to use the{' '}
          <code className='text-accent'>Swap</code> component with the default{' '}
          <code className='text-accent'>rotate</code> animation:
        </p>
        <div className='mb-4 rounded-box bg-base-200 p-6'>
          <Swap animationType='rotate' active={isActive}>
            <div className='rounded-box p-4'>First Child</div>
            <div className='rounded-box p-4'>Second Child</div>
          </Swap>
        </div>
        <button onClick={() => setIsActive(!isActive)} className='btn'>
          Toggle Swap
        </button>
      </section>

      {/* Animation Types */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>Animation Types</h2>
        <p className='mb-4 text-base-content'>
          The <code className='text-accent'>Swap</code> component supports two
          animation types:
        </p>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>Rotate Animation</h3>
            <div className='rounded-box bg-base-200 p-6'>
              <Swap animationType='rotate' active={isActive}>
                <div className='rounded-box p-4'>First Child</div>
                <div className='rounded-box p-4'>Second Child</div>
              </Swap>
            </div>
          </div>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>Flip Animation</h3>
            <div className='rounded-box bg-base-200 p-6'>
              <Swap animationType='flip' active={isActive}>
                <div className='rounded-box p-4'>First Child</div>
                <div className='rounded-box p-4'>Second Child</div>
              </Swap>
            </div>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th className='bg-base-300'>Prop Name</th>
                <th className='bg-base-300'>Type</th>
                <th className='bg-base-300'>Description</th>
                <th className='bg-base-300'>Default Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='bg-base-200'>animationType</td>
                <td className='bg-base-200'>
                  <code>'rotate' | 'flip'</code>
                </td>
                <td className='bg-base-200'>
                  The type of animation to use when swapping.
                </td>
                <td className='bg-base-200'>
                  <code>undefined</code>
                </td>
              </tr>
              <tr>
                <td className='bg-base-100'>active</td>
                <td className='bg-base-100'>
                  <code>boolean</code>
                </td>
                <td className='bg-base-100'>
                  Whether the swap is active or not.
                </td>
                <td className='bg-base-100'>
                  <code>false</code>
                </td>
              </tr>
              <tr>
                <td className='bg-base-200'>className</td>
                <td className='bg-base-200'>
                  <code>string</code>
                </td>
                <td className='bg-base-200'>
                  Additional CSS classes to apply to the swap container.
                </td>
                <td className='bg-base-200'>
                  <code>undefined</code>
                </td>
              </tr>
              <tr>
                <td className='bg-base-100'>children</td>
                <td className='bg-base-100'>
                  <code>[React.ReactNode, React.ReactNode]</code>
                </td>
                <td className='bg-base-100'>
                  An array of two React nodes. The first node is shown when
                  active, and the second node is shown when inactive.
                </td>
                <td className='bg-base-100'>
                  <code>undefined</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Custom Class Names */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>Custom Class Names</h2>
        <p className='mb-4 text-base-content'>
          You can pass custom class names to the{' '}
          <code className='text-accent'>Swap</code> component to further
          customize its appearance:
        </p>
        <div className='rounded-box bg-base-200 p-6'>
          <Swap className='custom-class' active={isActive}>
            <div className='rounded-box p-4'>First Child</div>
            <div className='rounded-box p-4'>Second Child</div>
          </Swap>
        </div>
      </section>
    </div>
  );
};
