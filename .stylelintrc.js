module.exports = {
  /** 插件配置，提供处理器 */
  plugins: ['stylelint-order'],

  /** 启用默认规则 */
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue'],

  /** 规则配置，优先级高于 extends */
  rules: {
    // class 命名正则
    'selector-class-pattern': [
      '^(.)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    // 使用单引号
    'string-quotes': 'single',
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    // @extend 可以继承%外的样式
    'at-extend-no-missing-placeholder': null,
    // 指定@规则名的大小写
    'at-rule-name-case': 'lower',
    // 禁止零长度的单位
    'length-zero-no-unit': true,
    // 简写属性
    'shorthand-property-no-redundant-values': true,
    // 小数不带0
    'number-leading-zero': 'never',
    // 禁止声明重复属性
    'declaration-block-no-duplicate-properties': true,
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': true,
    // 限制一个选择器中 ID 选择器的数量
    'selector-max-id': 0,
    // 最深嵌套
    'max-nesting-depth': 3,
    // 指定缩进
    indentation: [
      2,
      {
        severity: 'warning'
      }
    ],
    // 样式顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-color',
      'border',
      'border-radius',
      'content',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'transform'
    ]
  }
}
