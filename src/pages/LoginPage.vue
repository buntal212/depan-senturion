<template>
  <div class="login-page">
    <!-- ANIMATED BUBBLES -->
    <div class="bubbles">
      <span class="bubble bubble-1"></span>
      <span class="bubble bubble-2"></span>
      <span class="bubble bubble-3"></span>
      <span class="bubble bubble-4"></span>
      <span class="bubble bubble-5"></span>
      <span class="bubble bubble-6"></span>
      <span class="bubble bubble-7"></span>
      <span class="bubble bubble-8"></span>
      <span class="bubble bubble-9"></span>
    </div>
    <!-- BACKGROUND RUMAH SAKIT -->
    <div class="hospital-background"></div>

    <!-- LAPISAN PUTIH AGAR BACKGROUND TIDAK TERLALU KUAT -->
    <div class="background-overlay"></div>

    <!-- ORNAMEN ATAS -->
    <div class="top-decoration top-decoration-left"></div>
    <div class="top-decoration top-decoration-right"></div>

    <!-- =========================
         CONTENT
    ========================== -->
    <main class="login-container">
      <!-- BRAND -->
      <section class="brand">
        <img :src="logoSenturion" alt="SENTURION" class="brand-logo" />
      </section>

      <!-- LOGIN CARD -->
      <q-card class="login-card">
        <q-card-section class="login-card-body">
          <!-- JUDUL LOGIN -->
          <div class="login-title">
            <div class="login-title-main">Sistem Informasi Manajemen</div>

            <div class="login-title-sub">Rumah Sakit</div>
          </div>

          <!-- USERNAME -->
          <q-input
            v-model="form.username"
            outlined
            dense
            hide-bottom-space
            placeholder="username"
            autocomplete="username"
            class="login-input"
            :disable="loading"
            @keyup.enter="login"
          >
            <template #prepend>
              <q-icon name="person_outline" size="22px" />
            </template>
          </q-input>

          <!-- PASSWORD -->
          <q-input
            v-model="form.password"
            outlined
            dense
            hide-bottom-space
            :type="showPassword ? 'text' : 'password'"
            placeholder="password"
            autocomplete="current-password"
            class="login-input q-mt-md"
            :disable="loading"
            @keyup.enter="login"
          >
            <template #prepend>
              <q-icon name="lock_outline" size="21px" />
            </template>

            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                size="21px"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <!-- OPTIONS -->
          <div class="login-options">
            <q-checkbox v-model="remember" dense color="primary" label="Ingat saya" />

            <button type="button" class="forgot-button" @click="forgotPassword">
              Lupa password?
            </button>
          </div>

          <!-- BUTTON LOGIN -->
          <q-btn
            unelevated
            no-caps
            class="login-button full-width"
            :loading="loading"
            :disable="loading"
            @click="login"
          >
            Masuk
          </q-btn>
        </q-card-section>
      </q-card>
    </main>

    <!-- =========================
         GOLD WAVE
    ========================== -->

    <div class="gold-wave gold-wave-left"></div>
    <div class="gold-wave gold-wave-right"></div>

    <!-- =========================
         BLUE WAVES
    ========================== -->

    <div class="blue-wave wave-one"></div>
    <div class="blue-wave wave-two"></div>
    <div class="blue-wave wave-three"></div>
    <div class="blue-wave wave-four"></div>

    <!-- FOOTER -->
    <footer class="footer">
      <div>© {{ currentYear }} SENTURION</div>

      <div>Support By ALTURA CONSULTING</div>
    </footer>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

import { useQuasar } from 'quasar'

import logoSenturion from '@/assets/images/logo-senturion.png'

const $q = useQuasar()

const loading = ref(false)

const showPassword = ref(false)

const remember = ref(true)

const form = reactive({
  username: '',
  password: '',
})

const currentYear = computed(() => {
  return new Date().getFullYear()
})

const login = async () => {
  if (!form.username.trim()) {
    $q.notify({
      type: 'warning',
      message: 'Username wajib diisi',
      position: 'top',
    })

    return
  }

  if (!form.password) {
    $q.notify({
      type: 'warning',
      message: 'Password wajib diisi',
      position: 'top',
    })

    return
  }

  loading.value = true

  try {
    /*
     * ==========================================
     * API LOGIN NANTI KITA PASANG DI SINI
     * ==========================================
     */

    await new Promise((resolve) => {
      setTimeout(resolve, 800)
    })

    $q.notify({
      type: 'positive',
      message: 'Login berhasil',
      position: 'top',
    })
  } catch (error) {
    console.error(error)

    $q.notify({
      type: 'negative',
      message: 'Login gagal',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  $q.notify({
    type: 'info',
    message: 'Silakan hubungi administrator.',
    position: 'top',
  })
}
</script>

<style scoped>
/* =========================================================
   PAGE
========================================================= */

.login-page {
  position: relative;

  width: 100%;
  height: 100vh;

  min-height: 650px;

  overflow: hidden;

  font-family: Inter, Arial, Helvetica, sans-serif;

  background: #ddecfa;
}

/* =========================================================
   HOSPITAL BACKGROUND
========================================================= */

.hospital-background {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 72%;

  z-index: 0;

  background-image: url('@/assets/images/bg-hospital.png');

  background-repeat: no-repeat;

  background-position: center 55%;

  background-size: cover;

  filter: saturate(0.7) brightness(1.12);
}

/* =========================================================
   WHITE / BLUE OVERLAY
========================================================= */

.background-overlay {
  position: absolute;

  inset: 0;

  z-index: 1;

  background: linear-gradient(
    180deg,
    rgba(235, 247, 255, 0.38) 0%,

    rgba(255, 255, 255, 0.35) 24%,

    rgba(235, 247, 255, 0.42) 48%,

    rgba(61, 155, 235, 0.3) 70%,

    rgba(0, 99, 210, 0.45) 100%
  );
}

/* =========================================================
   TOP ABSTRACT DECORATION
========================================================= */

.top-decoration {
  position: absolute;

  z-index: 2;

  pointer-events: none;
}

.top-decoration-left {
  top: -240px;
  left: -170px;

  width: 800px;
  height: 480px;

  border-radius: 50%;

  border: 2px solid rgba(255, 255, 255, 0.7);

  transform: rotate(-20deg);
}

.top-decoration-right {
  top: -290px;
  right: -160px;

  width: 900px;
  height: 520px;

  border-radius: 50%;

  border: 2px solid rgba(255, 255, 255, 0.65);

  transform: rotate(20deg);
}

/* =========================================================
   LOGIN CONTENT
========================================================= */

.login-container {
  position: relative;

  z-index: 20;

  width: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  padding-top: clamp(20px, 4vh, 48px);
}

/* =========================================================
   BRAND
========================================================= */

.brand {
  width: 390px;

  max-width: 72vw;

  text-align: center;
}

.brand-logo {
  display: block;

  width: 100%;

  margin: 0 auto;

  object-fit: contain;

  mix-blend-mode: multiply;
}

.brand-tagline {
  position: relative;

  margin-top: 12px;

  color: #0b376e;

  font-size: 17px;
  line-height: 1.35;
  font-weight: 600;

  text-align: center;
}

/* =========================================================
   LOGIN CARD
========================================================= */

.login-card {
  width: 460px;

  max-width: calc(100vw - 40px);

  margin-top: 24px;

  border-radius: 16px;

  background: rgba(255, 255, 255, 0.96);

  border: 1px solid rgba(255, 255, 255, 0.95);

  box-shadow: 0 14px 38px rgba(0, 70, 150, 0.16);

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);
}

.login-card-body {
  padding: 26px 30px 28px;
}

/* =========================================================
   INPUT
========================================================= */

.login-input {
  font-size: 15px;
}

.login-input :deep(.q-field__control) {
  height: 56px;

  border-radius: 8px;

  background: linear-gradient(180deg, #fafcff, #eef4fa);
}

.login-input :deep(.q-field__control::before) {
  border-color: #cbd9e8;
}

.login-input :deep(.q-field__control:hover::before) {
  border-color: #91b6da;
}

.login-input :deep(.q-field__prepend) {
  color: #49698e;

  padding-right: 13px;
}

.login-input :deep(.q-field__append) {
  color: #49698e;
}

.login-input :deep(.q-field__native) {
  color: #284b70;

  font-size: 15px;
}

.login-input :deep(.q-field__native::placeholder) {
  color: #8296ae;

  opacity: 1;
}

/* =========================================================
   LOGIN OPTIONS
========================================================= */

.login-options {
  height: 55px;

  display: flex;

  align-items: center;

  justify-content: space-between;
}

.login-options :deep(.q-checkbox__label) {
  margin-left: 4px;

  color: #244b74;

  font-size: 14px;

  font-weight: 500;
}

.forgot-button {
  padding: 5px 0;

  border: 0;

  background: transparent;

  color: #087cf0;

  font-family: inherit;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;
}

/* =========================================================
   LOGIN BUTTON
========================================================= */

.login-button {
  height: 55px;

  border-radius: 7px;

  background: linear-gradient(180deg, #152cfb, #0875e4);

  color: #ffffff;

  font-size: 17px;

  font-weight: 600;

  box-shadow: 0 5px 14px rgba(0, 100, 215, 0.22);
}

.login-button:hover {
  background: linear-gradient(180deg, #087ff0, #006bd6);
}

/* =========================================================
   GOLD WAVES
========================================================= */

.gold-wave {
  position: absolute;

  z-index: 8;

  pointer-events: none;

  background: linear-gradient(
    180deg,
    #fff09a 0%,

    #ffd143 20%,

    #e49b08 48%,

    #ffdc55 75%,

    #b97000 100%
  );

  box-shadow: 0 4px 14px rgba(120, 73, 0, 0.28);
}

/* =========================================================
   GOLD WAVES - DITURUNKAN
========================================================= */

.gold-wave-left {
  left: -8%;

  /* sebelumnya 24% */
  bottom: 14%;

  width: 64%;
  height: 80px;

  border-radius: 0 0 100% 0;

  transform: rotate(9deg);
}

.gold-wave-right {
  right: -8%;

  /* sebelumnya 24% */
  bottom: 14%;

  width: 64%;
  height: 80px;

  border-radius: 0 0 0 100%;

  transform: rotate(-9deg);
}

/* =========================================================
   BLUE WAVES
========================================================= */

.blue-wave {
  position: absolute;

  left: -10%;

  width: 120%;

  pointer-events: none;

  border-radius: 50% 50% 0 0;
}

/* =========================================================
   BLUE WAVES - DITURUNKAN
========================================================= */

.wave-one {
  z-index: 9;

  /* lapisan biru paling atas */
  bottom: -4%;

  height: 210px;

  transform: rotate(1deg);

  background: linear-gradient(100deg, #0061ca 0%, #1698ff 47%, #0063d1 100%);
}

.wave-two {
  z-index: 10;

  bottom: -11%;

  height: 205px;

  transform: rotate(-4deg);

  background: linear-gradient(100deg, #006de2, #0c87ee, #0050b5);
}

.wave-three {
  z-index: 11;

  bottom: -18%;

  height: 195px;

  transform: rotate(2deg);

  background: linear-gradient(100deg, #0052ae, #0069d5, #003c8e);
}

.wave-four {
  z-index: 12;

  bottom: -25%;

  height: 210px;

  transform: rotate(-2deg);

  background: linear-gradient(100deg, #002c6d, #004da6, #00245b);
}

/* =========================================================
   FOOTER
========================================================= */

.footer {
  position: absolute;

  z-index: 50;

  left: 0;

  bottom: 22px;

  width: 100%;

  text-align: center;

  color: white;

  font-size: 12px;

  line-height: 1.5;

  text-shadow: 0 2px 6px rgba(0, 31, 80, 0.65);
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {
  .brand {
    width: 330px;
  }

  .brand-tagline {
    font-size: 15px;

    margin-top: -20px;
  }

  .login-card {
    width: 430px;

    margin-top: 18px;
  }

  .hospital-background {
    height: 75%;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {
  .login-page {
    min-height: 620px;
  }

  .hospital-background {
    height: 72%;

    background-position: center top;
  }

  .login-container {
    padding-top: 15px;
  }

  .brand {
    width: 265px;

    max-width: 74vw;
  }

  .brand-tagline {
    margin-top: -15px;

    font-size: 12px;
  }

  .login-card {
    width: calc(100% - 44px);

    margin-top: 15px;

    border-radius: 13px;
  }

  .login-card-body {
    padding: 18px;
  }

  .login-input :deep(.q-field__control) {
    height: 47px;
  }

  .login-options {
    height: 46px;
  }

  .login-button {
    height: 47px;

    font-size: 15px;
  }

  .gold-wave-left,
  .gold-wave-right {
    bottom: 22%;

    height: 60px;
  }

  .wave-one {
    height: 200px;
  }

  .wave-two {
    height: 195px;
  }

  .wave-three {
    height: 190px;
  }

  .wave-four {
    height: 200px;
  }

  .footer {
    bottom: 12px;

    font-size: 11px;
  }
}

.login-title {
  margin-bottom: 22px;
  text-align: center;
  color: #0b376e;
}

.login-title-main {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.25;
}

.login-title-sub {
  margin-top: 3px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.25;
}

@media (max-width: 600px) {
  .login-title {
    margin-bottom: 17px;
  }

  .login-title-main,
  .login-title-sub {
    font-size: 16px;
  }
}

/* =========================================================
   SHORT SCREEN
========================================================= */

@media (max-height: 720px) {
  .login-container {
    padding-top: 7px;
  }

  .brand {
    width: 280px;
  }

  .brand-tagline {
    margin-top: -17px;

    font-size: 12px;
  }

  .login-card {
    margin-top: 10px;
  }

  .login-card-body {
    padding: 16px 20px;
  }

  .login-input :deep(.q-field__control) {
    height: 47px;
  }

  .login-options {
    height: 44px;
  }

  .login-button {
    height: 45px;
  }

  .footer {
    bottom: 8px;
  }
}

/* =========================================================
   ANIMATED BUBBLES
========================================================= */

.bubbles {
  position: absolute;
  inset: 0;

  z-index: 15;

  overflow: hidden;
  pointer-events: none;
}

.bubble {
  position: absolute;

  bottom: -120px;

  display: block;

  border-radius: 50%;

  background: radial-gradient(
    circle at 30% 25%,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.55) 15%,
    rgba(78, 180, 255, 0.38) 45%,
    rgba(0, 102, 220, 0.25) 72%,
    rgba(0, 74, 170, 0.12) 100%
  );

  border: 1.5px solid rgba(255, 255, 255, 0.75);

  box-shadow:
    inset -8px -8px 18px rgba(0, 91, 190, 0.12),
    inset 5px 5px 12px rgba(255, 255, 255, 0.65),
    0 4px 16px rgba(0, 83, 180, 0.18);

  backdrop-filter: blur(1px);

  animation-name: bubbleFloat;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* =========================================================
   9 BUBBLES
========================================================= */

.bubble-1 {
  left: 4%;

  width: 42px;
  height: 42px;

  animation-duration: 15s;
  animation-delay: -2s;
}

.bubble-2 {
  left: 13%;

  width: 72px;
  height: 72px;

  animation-duration: 21s;
  animation-delay: -10s;
}

.bubble-3 {
  left: 25%;

  width: 28px;
  height: 28px;

  animation-duration: 13s;
  animation-delay: -5s;
}

.bubble-4 {
  left: 36%;

  width: 52px;
  height: 52px;

  animation-duration: 18s;
  animation-delay: -13s;
}

.bubble-5 {
  left: 48%;

  width: 32px;
  height: 32px;

  animation-duration: 14s;
  animation-delay: -8s;
}

.bubble-6 {
  left: 61%;

  width: 65px;
  height: 65px;

  animation-duration: 22s;
  animation-delay: -16s;
}

.bubble-7 {
  left: 73%;

  width: 38px;
  height: 38px;

  animation-duration: 16s;
  animation-delay: -6s;
}

.bubble-8 {
  left: 84%;

  width: 78px;
  height: 78px;

  animation-duration: 24s;
  animation-delay: -18s;
}

.bubble-9 {
  left: 94%;

  width: 46px;
  height: 46px;

  animation-duration: 17s;
  animation-delay: -11s;
}

/* =========================================================
   ANIMATION
========================================================= */

@keyframes bubbleFloat {
  0% {
    transform: translate3d(0, 100px, 0) scale(0.75);

    opacity: 0;
  }

  10% {
    opacity: 0.75;
  }

  25% {
    transform: translate3d(25px, -25vh, 0) scale(0.9);
  }

  50% {
    transform: translate3d(-20px, -55vh, 0) scale(1);
  }

  75% {
    transform: translate3d(30px, -85vh, 0) scale(1.08);

    opacity: 0.55;
  }

  90% {
    opacity: 0.35;
  }

  100% {
    transform: translate3d(-15px, -125vh, 0) scale(1.18);

    opacity: 0;
  }
}
</style>
