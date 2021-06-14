<template lang="pug">
  .publicaciones
    Header(
      seccionActiva="publicaciones")
    .black-screen.fadeIn(
      v-onEscClose=""
      @click="closePublicacionActiva"
      v-if="publicionAcitva.anio")
    .filtros
      .filtro.anio.desplegable
        .lista.anios(@click="toggleAnioDesplegado")
          .item.anio(
            v-if="!anioActivo || anioDesplegado"
            :class="{desplegado: anioDesplegado}"
            @click="setAnioActivo(false)"
            title="Todos los años")
            span Año
          .item.anio(
            v-for="anio in anios"
            :key="anio"
            @click="setAnioActivo('-' + anio)"
            :class="{desplegado: anioDesplegado}"
            v-if="anioActivo === '-' + anio || anioDesplegado")
            span {{anio}}
        .caret
          font-awesome-icon(
            :icon="anioDesplegado ? 'chevron-up' : 'chevron-down'"
            @click="toggleAnioDesplegado")
      .filtro.mes.desplegable
        .lista.meses(@click="toggleMesDesplegado")
          .item.mes(
            v-if="!mesActivo || mesDesplegado"
            :class="{desplegado: mesDesplegado}"
            @click="setMesActivo(false)"
            title="Todos los meses")
            span Mes
          .item.mes(
            v-for="(mes, index) in meses"
            :key="mes"
            :class="{desplegado: mesDesplegado}"
            @click="setMesActivo(index + 1)"
            v-if="mesActivo === index + 1 || mesDesplegado")
            span {{mes}}
        .caret
          font-awesome-icon(
            :icon="mesDesplegado ? 'chevron-up' : 'chevron-down'"
            @click="toggleMesDesplegado")
      .filtro.titulo
        input(
          type="text"
          v-model="tituloActivo"
          placeholder="Título")
    .lista-publicaciones
      .lista-anio(
        v-swipe.setScrollPrev.setScrollNext="anio"
        v-for="(pubs, anio, index) in publicaciones"
        :key="anio"
        v-if="!anioActivo || anioActivo === anio")
        .anio
          span {{anios[index]}}
        .lista-flechas
          .flecha.izq(@click="setScrollPrev(anio)")
            font-awesome-icon(icon="chevron-left")
          .contenedor-lista(:class="'scroll-' + scroll[anio]")
            .lista
              .publicacion(
                v-for="(publicacion, index) in byMesAndTitulo(pubs)"
                :key="publicacion._id"
                :class="['mod-' + index % 3]")
                .box(
                  @click="setPublicacionActiva(anio, index)")
                  .titulo
                    span {{publicacion.titulo}}
                  .autor
                    span Autor/es: {{publicacion.autor}}
          .flecha.der(@click="setScrollNext(anio)")
            font-awesome-icon(icon="chevron-right")
        .show-flechas(
          v-swipe.setScrollShowPrev.setScrollShowNext='anio'
          :style="'width: ' + (innerWidth - scrollWidth) + 'px'"
          v-if="publicionAcitva.anio === anio")
          .cerrar(@click="closePublicacionActiva")
            font-awesome-icon(icon="times")
          .flecha.izq(@click="setScrollShowPrev(anio)")
            font-awesome-icon(icon="chevron-left")
          .contenedor-show(:class="'scroll-' + publicionAcitva.index")
            .show
              .publicacion(
                v-for="(publicacion, index) in byMesAndTitulo(pubs)"
                :key="publicacion._id")
                .cabecera
                  .titulo
                    span {{publicacion.titulo}}
                  .autor-pubdate
                    .autor
                      span Autor/es:
                      span {{publicacion.autor}}
                    .diario
                      span Publicado en:
                      span {{publicacion.diario}}
                    .pubdate
                      span {{meses[new Date(publicacion.pubdate).getMonth()]}}, {{new Date(publicacion.pubdate).getFullYear()}}
                .cuerpo
                  .texto(v-html="publicacion.texto")
          .flecha.der(@click="setScrollShowNext(anio)")
            font-awesome-icon(icon="chevron-right")
</template>

<script>
import moment from "moment-timezone";

import Header from "./Header";

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

export default {
  components: {
    Header
  },
  directives: {
    onEscClose(el, bindings, vnode) {
      const closePub = ev => {
        if (ev.which === 27) {
          vnode.context.closePublicacionActiva();
          window.removeEventListener("keyup", closePub);
        }
      };
      window.addEventListener("keyup", closePub);
    }
  },
  data() {
    return {
      moment,
      innerWidth: window.innerWidth,
      scrollWidth: window.innerWidth > 768 ? 19 : 6,
      anios: [],
      publicaciones: "",
      meses,
      anioActivo: false,
      mesActivo: false,
      tituloActivo: "",
      anioDesplegado: false,
      mesDesplegado: false,
      scroll: {},
      publicionAcitva: {
        anio: false,
        index: -1
      }
    };
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/api/publicaciones"
    }).then(
      ({ data }) => {
        this.publicaciones = data.reduce((publicaciones, p) => {
          if (!publicaciones[`-${moment(p.pubdate).year()}`]) {
            publicaciones[`-${moment(p.pubdate).year()}`] = [];
            this.anios.push(moment(p.pubdate).year());
            this.scroll[`-${moment(p.pubdate).year()}`] = 0;
          }
          publicaciones[`-${moment(p.pubdate).year()}`].push(p);
          return publicaciones;
        }, {});
      },
      error => {
        console.error(error);
      }
    );
  },
  methods: {
    toggleAnioDesplegado() {
      if (this.anioDesplegado) {
        this.anioDesplegado = false;
      } else {
        this.anioDesplegado = true;
      }
    },
    toggleMesDesplegado() {
      if (this.mesDesplegado) {
        this.mesDesplegado = false;
      } else {
        this.mesDesplegado = true;
      }
    },
    setAnioActivo(anio) {
      this.anioActivo = anio;
    },
    setMesActivo(mes) {
      this.mesActivo = mes;
    },
    byMesAndTitulo(arr) {
      let outArr = [];
      if (this.mesActivo && this.tituloActivo) {
        outArr = arr.filter(
          pub =>
            moment(pub.pubdate).month() === this.mesActivo - 1 &&
            RegExp(this.tituloActivo, "gi").test(pub.titulo)
        );
      } else if (this.mesActivo) {
        outArr = arr.filter(pub => moment(pub.pubdate).month() === this.mesActivo - 1);
      } else if (this.tituloActivo) {
        outArr = arr.filter(pub => RegExp(this.tituloActivo, "gi").test(pub.titulo));
      } else {
        outArr = arr;
      }
      return outArr;
    },
    setScrollPrev(anio) {
      if (this.scroll[anio] > 0) {
        this.scroll = { ...this.scroll, [anio]: this.scroll[anio] - 1 };
      }
    },
    setScrollShowPrev(anio) {
      if (this.publicionAcitva.index > 0) {
        this.publicionAcitva = { anio, index: this.publicionAcitva.index - 1 };
      }
    },
    setScrollNext(anio) {
      if (
        (this.scroll[anio] + 1) * (window.innerWidth > 768 ? 3 : 1) <
        this.publicaciones[anio].length
      ) {
        this.scroll = { ...this.scroll, [anio]: this.scroll[anio] + 1 };
      }
    },
    setScrollShowNext(anio) {
      if (this.publicionAcitva.index + 1 < this.publicaciones[anio].length) {
        this.publicionAcitva = { anio, index: this.publicionAcitva.index + 1 };
      }
    },
    setPublicacionActiva(anio, index) {
      this.publicionAcitva = { anio, index: 0 };
      setTimeout(() => {
        this.publicionAcitva = { ...this.publicionAcitva, index };
      }, 300);
    },
    closePublicacionActiva() {
      this.publicionAcitva = { anio: false, index: -1 };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.publicaciones {
  padding: 0 40px;
  @media all and (max-width: $btMD) {
    padding: 0 10px;
  }
  .black-screen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(#000, 0.2);
    z-index: 50;
  }
  .filtros {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 35px;
    padding-bottom: 25px;
    margin-bottom: 25px;
    background-color: #f8f8f8;
    border-radius: 5px;
    @media all and (max-width: $btMD) {
      background-color: transparent;
      margin-bottom: 0;
    }
    &::after {
      content: "";
      width: 99.5%;
      margin: 0 0.5%;
      height: 15px;
      border-top: 1px solid #ccc;
      margin-top: 25px;
      @media all and (max-width: $btMD) {
        display: none;
      }
    }
    .filtro {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin: 0 22.5px;
      height: 35px;
      position: relative;
      @media all and (max-width: $btMD) {
        margin: 0 5px;
        align-items: center;
      }
      &.desplegable {
        &.anio {
          width: 80px;
          @media all and (max-width: $btMD) {
            width: 80px;
          }
        }
        &.mes {
          width: 120px;
          @media all and (max-width: $btMD) {
            width: 80px;
          }
        }
        .lista {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #fff;
          border: 1px solid rgba(#000, 0.3);
          border-radius: 20px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          width: 100%;
          @include ease-transition;
          cursor: pointer;
          overflow: hidden;
          &:hover {
            border: 1px solid rgba(#000, 0.5);
          }
          .item {
            height: 35px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            @include ease-transition;
            &.desplegado {
              &:hover {
                background-color: rgba($colorAzulMedio, 0.3);
              }
            }
            span {
              /*font-family: $fontMontserratBold;*/
              font-family: $fontGibson;
              font-weight: 600;
              color: $colorAzulPastelOscuro;
              font-size: 95%;
              @media all and (max-width: $btMD) {
                width: 90%;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        .caret {
          @include minmaxwh(35px);
          position: absolute;
          right: -40px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 11;
          cursor: pointer;
          @media all and (max-width: $btMD) {
            display: none;
          }
          svg {
            color: $colorAzulPastelOscuro;
            font-size: 135%;
          }
        }
      }
      &.titulo {
        input {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #fff;
          border: 1px solid rgba(#000, 0.3);
          border-radius: 20px;
          height: 100%;
          /*font-family: $fontMontserratBold;*/
          font-family: $fontGibson;
          font-weight: 600;
          color: $colorAzulPastelOscuro;
          font-size: 95%;
          padding: 0 10px;
          text-align: center;
          @media all and (max-width: $btMD) {
            width: 120px;
          }
        }
      }
    }
  }
  .lista-publicaciones {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    .lista-anio {
      padding: 0 75px;
      width: 100%;
      padding-bottom: 55px;
      margin-bottom: 35px;
      border-bottom: 1px solid #ccc;
      position: relative;
      @media all and (max-width: $btMD) {
        padding: 15px 40px;
      }
      .anio {
        margin-bottom: 20px;
        margin-left: 10px;
        @media all and (max-width: $btMD) {
          width: 100%;
          text-align: center;
        }
        span {
          /*font-family: $fontMontserratExtraBold;*/
          font-family: $fontGibson;
          font-weight: 600;
          font-size: 170%;
          letter-spacing: 5px;
          color: $colorAzulPastelMedio;
        }
      }
      .lista-flechas {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        .flecha {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          @include minmaxwh(40px);
          background-color: $colorAzulPastelOscuro;
          border-radius: 50%;
          @include sombra(2px 2px 5px 0 #333);
          cursor: pointer;
          opacity: 0.8;
          @include ease-transition;
          @media all and (max-width: $btMD) {
            @include minmaxwh(35px);
            @include sombra(2px 2px 5px 0 #666);
          }
          &:hover {
            opacity: 1;
          }
          &.izq {
            left: -60px;
            @media all and (max-width: $btMD) {
              left: -35px;
            }
          }
          &.der {
            right: -60px;
            @media all and (max-width: $btMD) {
              right: -35px;
            }
          }
          svg {
            color: #fff;
            font-size: 150%;
          }
        }
        .contenedor-lista {
          width: 100%;
          overflow: hidden;
          padding: 15px 1px;
          @for $i from 1 through 150 {
            &.scroll-#{$i} {
              .lista {
                -webkit-transform: translateX($i * -100%);
                transform: translateX($i * -100%);
              }
            }
          }
          .lista {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            @include ease-transition(700ms);
            .publicacion {
              height: 340px;
              width: 31.3333%;
              min-width: 31.3333%;
              margin: 0 1%;
              display: flex;
              justify-content: center;
              align-items: center;
              @media all and (max-width: $btMD) {
                width: 94%;
                min-width: 94%;
                margin: 0 3%;
              }
              // &.mod-0 {
              //   justify-content: flex-start;
              // }
              // &.mod-1 {
              //   justify-content: center;
              // }
              // &.mod-2 {
              //   justify-content: flex-end;
              // }
              .box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: column;
                padding: 40px 20px;
                width: 250px;
                height: 100%;
                border: 10px solid #fff;
                border-radius: 6px;
                position: relative;
                background-color: #fff;
                cursor: pointer;
                @include sombra(0 0 5px 0 #000);
                text-decoration: none;
                text-align: center;
                @include ease-transition;
                &:hover {
                  &::after {
                    background-color: rgba($colorAzulPastelMedio, 0.9);
                  }
                }
                &::after {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  content: "";
                  background-color: rgba($colorAzulOscuro, 0.85);
                  z-index: 1;
                  @include ease-transition;
                }
                .titulo {
                  position: relative;
                  z-index: 2;
                  span {
                    /*font-family: $fontMontserratBold;*/
                    font-family: $fontGibson;
                    font-weight: 600;
                    color: #fff;
                    font-size: 15px;
                    line-height: 1.4;
                  }
                }
                .autor {
                  position: relative;
                  z-index: 2;
                  span {
                    /*font-family: $fontMontserratRegular;*/
                    font-family: $fontGibson;
                    color: #fff;
                    font-size: 90%;
                    line-height: 1.5;
                  }
                }
              }
            }
          }
        }
      }
      .show-flechas {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        left: -38px;
        top: -10%;
        height: 120%;
        z-index: 60;
        @media all and (max-width: $btMD) {
          left: -7px;
          height: 170%;
        }
        .cerrar {
          position: absolute;
          right: 12.5%;
          top: -40px;
          @include minmaxwh(48px);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          @include ease-transition;
          opacity: 0.5;
          z-index: 70;
          @media all and (max-width: $btMD) {
            right: 6px;
          }
          &:hover {
            opacity: 1;
          }
          svg {
            color: #000;
            font-size: 150%;
          }
        }
        .flecha {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          @include minmaxwh(40px);
          background-color: $colorAzulPastelOscuro;
          border-radius: 50%;
          @include sombra(2px 2px 5px 0 #333);
          cursor: pointer;
          opacity: 0.8;
          z-index: 70;
          @include ease-transition;
          @media all and (max-width: $btMD) {
            @include minmaxwh(35px);
            @include sombra(2px 2px 5px 0 #666);
            display: none;
          }
          &:hover {
            opacity: 1;
          }
          &.izq {
            left: 12.5%;
            @media all and (max-width: $btMD) {
              left: 6px;
            }
          }
          &.der {
            right: 12.5%;
            @media all and (max-width: $btMD) {
              right: 6px;
            }
          }
          svg {
            color: #fff;
            font-size: 150%;
          }
        }
        .contenedor-show {
          width: 100%;
          overflow: hidden;
          padding: 15px 1px;
          height: 100%;
          @for $i from 1 through 150 {
            &.scroll-#{$i} {
              .show {
                -webkit-transform: translateX($i * -82.5%);
                transform: translateX($i * -82.5%);
                @media all and (max-width: $btMD) {
                  -webkit-transform: translateX($i * -91.5%);
                  transform: translateX($i * -91.5%);
                }
              }
            }
          }
          .show {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            width: 100%;
            height: 100%;
            @include ease-transition(300ms);
            &::before,
            &::after {
              content: "";
              height: 100%;
              width: 7.5%;
              min-width: 7.5%;
              display: block;
              background-color: #fff;
              @include sombra(0 0 15px 0 #222);
              @media all and (max-width: $btMD) {
                width: 3%;
                min-width: 3%;
                background-color: #beb8b8;
              }
            }
            &::before {
              border-radius: 0 15px 15px 0;
              margin-right: 1.25%;
            }
            &::after {
              border-radius: 15px 0 0 15px;
              margin-left: 1.25%;
            }
            .publicacion {
              width: 80%;
              min-width: 80%;
              height: 100%;
              background-color: #fff;
              margin: 0 1.25%;
              border-radius: 15px;
              @include sombra(0 0 15px 0 #222);
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-direction: column;
              padding: 10px 8%;
              @media all and (max-width: $btMD) {
                width: 89%;
                min-width: 89%;
              }
              .cabecera {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                margin-bottom: 15px;
                height: 110px;
                min-height: 110px;
                width: 100%;
                @media all and (max-width: $btMD) {
                  height: auto;
                  min-height: 0;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: flex-start;
                  position: relative;
                  padding-top: 55px;
                }
                .titulo {
                  width: 40%;
                  max-width: 40%;
                  text-align: left;
                  @media all and (max-width: $btMD) {
                    width: 100%;
                    max-width: none;
                    margin-bottom: 24px;
                  }
                  span {
                    /*font-family: $fontMontserratBold;*/
                    font-family: $fontGibson;
                    font-weight: 600;
                    text-transform: uppercase;
                    color: #2989c9;
                    @media all and (max-width: $btMD) {
                      font-size: 11px;
                      /*font-family: $fontMontserratRegular;*/
                      font-family: $fontGibson;
                      text-transform: none;
                    }
                  }
                }
                .autor-pubdate {
                  width: 40%;
                  max-width: 40%;
                  text-align: right;
                  @media all and (max-width: $btMD) {
                    width: 100%;
                    max-width: none;
                    text-align: left;
                  }
                  .autor,
                  .diario {
                    margin-top: 5px;
                    @media all and (max-width: $btMD) {
                      margin-bottom: 24px;
                    }
                    span {
                      /*font-family: $fontMontserratRegular;*/
                      font-family: $fontGibson;
                      color: #2989c9;
                      @media all and (max-width: $btMD) {
                        font-size: 80%;
                      }
                      &:first-of-type {
                        margin-right: 4px;
                        /*font-family: $fontMontserratBold;*/
                        font-family: $fontGibson;
                        font-weight: 600;
                      }
                    }
                  }
                  .autor {
                    span:first-of-type {
                      @media all and (max-width: $btMD) {
                        display: block;
                      }
                    }
                  }
                  .pubdate {
                    @media all and (max-width: $btMD) {
                      margin-top: 5px;
                      position: absolute;
                      right: 0;
                      top: 10px;
                    }
                    span {
                      /*font-family: $fontMontserratLight;*/
                      font-family: $fontGibson;
                      font-weight: 300;
                      @media all and (max-width: $btMD) {
                        font-size: 80%;
                        text-transform: uppercase;
                        color: #000;
                      }
                    }
                  }
                }
              }
              .cuerpo {
                width: 100%;
                height: 90%;
                overflow: auto;
                @media all and (max-width: $btMD) {
                  height: 70%;
                }
                .texto {
                  text-align: justify;
                  /*font-family: $fontMontserratRegular;*/
                  font-family: $fontGibson;
                  line-height: 2;
                  @media all and (max-width: $btMD) {
                    font-size: 11.5px;
                    word-wrap: break-word;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
