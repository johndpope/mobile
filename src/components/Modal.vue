<template lang="html">
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang="scss">

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: calc(100% - 80px);
  max-width: 992px;
  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #3C3C3C;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer span {
  color: $color-cinza;
}

.modal-default-button {
  @include button();
  color: white;
  background-color: $color-blue;
}
.modal-success-button {
  @include button();
  color: white;
  background-color: $color-green;
}
.modal-cancel-button {
  @include button();
  color: white;
  background-color: $color-red;
}

.modal-close-button {
  @include button();
  position: absolute;
  top: 10px; right: 10px;
  color: white;
  background-color: $color-red;
}

// animation in-out
.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: translate3d(0px, 200px, 0px) scale3d(1, 2, 1);
}

</style>
