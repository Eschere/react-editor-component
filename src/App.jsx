import React from 'react';
import OwnServer from './OwnServer';
import QiniuServer from './QiniuServer';

export default () => (
  <div>
    <OwnServer></OwnServer>
    <hr />
    <hr />
    <QiniuServer></QiniuServer>
  </div>
);
