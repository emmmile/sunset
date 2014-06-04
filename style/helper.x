// Exponent
// From: https://github.com/Team-Sass/Sassy-math/blob/master/sass/math.scss#L36

@function exponent($base, $exponent) {
  // reset value
  $value: $base;
  // positive intergers get multiplied
  @if $exponent > 1 {
    @for $i from 2 through $exponent {
      $value: $value * $base; } }
  // negitive intergers get divided. A number divided by itself is 1
  @if $exponent < 1 {
    @for $i from 0 through -$exponent {
      $value: $value / $base; } }
  // return the last value written
  @return $value;
}

@function pow($base, $exponent) {
  @return exponent($base, $exponent);
}

// Transition mixins
@mixin transition($args...) {
  -webkit-transition: $args;
  -moz-transition: $args;
  transition: $args;
}

@mixin transition-property($args...) {
  -webkit-transition-property: $args;
  -moz-transition-property: $args;
  transition-property: $args;
}

@mixin animation($args...) {
  -webkit-animation: $args;
  -moz-animation: $args;
  animation: $args;
}

@mixin animation-fill-mode($args...) {
  -webkit-animation-fill-mode: $args;
  -moz-animation-fill-mode: $args;
  animation-fill-mode: $args;
}

@mixin transform($args...) {
  -webkit-transform: $args;
  -moz-transform: $args;
  transform: $args;
}

// Keyframe animations
@mixin keyframes($animation-name) {
  @-webkit-keyframes $animation-name {
    @content;
  }
  @-moz-keyframes $animation-name {
    @content;
  }
  @keyframes $animation-name {
    @content;
  }
}

// Media queries
@mixin smaller($width) {
  @media screen and (max-width: $width) {
    @content;
  }
}

// Clearfix
@mixin clearfix {
  &:after {
    content: "";
    display: block;
    clear: both;
  }
}
