import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import notify from 'rollup-plugin-notify';
import {sizeSnapshot} from 'rollup-plugin-size-snapshot';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';
const name = 'components';
const input = './src/index.ts';

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  moment: 'moment',
  antd: 'antd',
  'cross-fetch': 'fetch',
  classnames: 'classNames',
  'fbjs/lib/ExecutionEnvironment': 'canUseDOM',
  'react-is': 'isFragment'
};

const babelOptionsCJS = {
  exclude: /node_modules/
};
const babelOptionsESM = {
  exclude: /node_modules/,
  runtimeHelpers: true
  //  plugins: [["@babel/runtime", { useESModules: true }]]
};
const commonjsOptions = {
  //  include: /node_modules/
};

export default [
  {
    input,
    output: {file: `cjs/${pkg.name}.js`, format: 'cjs', name, globals},
    external: Object.keys(globals),
    plugins: [
      typescript(),
      // nodeResolve(),
      babel(babelOptionsESM),
      commonjs(commonjsOptions),
      // replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      postcss({
        plugins: []
      }),
      sizeSnapshot(),
      notify()
    ]
  },
  {
    input,
    output: {file: `umd/${pkg.name}.js`, format: 'umd', name, globals},
    external: Object.keys(globals),
    plugins: [
      typescript(),
      nodeResolve(),
      postcss({
        autoModules: false,
        plugins: []
      }),
      babel(babelOptionsESM),
      commonjs(commonjsOptions),
      replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      sizeSnapshot(),
      notify()
    ]
  }
];
