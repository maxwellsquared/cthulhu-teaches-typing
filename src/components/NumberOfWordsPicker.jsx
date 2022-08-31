import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

const NumberOfWordsPicker = () => {
  const [value, setValue] = useState('50');
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: '25', value: 25 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
        { label: '200', value: 200 },
      ]}
    />
  );
};

export default NumberOfWordsPicker;
