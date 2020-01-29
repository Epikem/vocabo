
'use strict';
const request = require('request');
const Hangul = require('hangul-js');
// 

const DictionaryURL = 'http://epikem-files.s3.ap-northeast-2.amazonaws.com/kengdic_2011_minified.json';

/**
 * @class Dictionary
 * @member {Array<string>} dictionary
 * @member {string} dictionaryStr
 */
module.exports = class Dictionary {

  constructor(dictionaryURL) {
    this.dictionaryURL = dictionaryURL || DictionaryURL;
    this.dictionary=undefined;
    this.dictionaryStr='';
    this.loadDictionary(this.dictionaryURL);
  }

  is_hangul_char(ch) {
    const c = ch.charCodeAt(0);
    if (0x1100 <= c && c <= 0x11FF) return true;
    if (0x3130 <= c && c <= 0x318F) return true;
    if (0xAC00 <= c && c <= 0xD7A3) return true;
    return false;
  }
  
  /**
   * @param  {string} url
   * @returns {Promise<any|Error>}
   */
  async loadDictionary(url){
    if (this.dictionary != undefined) {
      return this.dictionary;
    }
    return new Promise((resolve, reject)=>{
      console.log('downloading dictionary');

      request(url, function (err, response, body) {
        // console.log(response);
        return resolve(JSON.parse(response.body));
      });
    }) 
  }

  // /**
  //  * @param  {string} url
  //  * @param  {CallableFunction} callback
  //  */
  // loadDictionary(url, callback) {
  //   if (this.dictionary != '') return this.dictionary;

  //   request(url, { encoding: 'utf8' }).on('data', (data) => {
  //     try {
  //       this.dictionary += data;
  //     }
  //     catch (error) {
  //       console.error(error);
  //     }
  //   })

  //   request(url, { encoding: 'utf8' }).on('complete', (data) => {
  //     try {
  //       // console.log(this.dictionary);
  //     }
  //     catch (error) {
  //       console.error('error');
  //       console.error(error);
  //     }
  //     if(callback!=null)
  //       return callback(this);
  //   })
  // }

  async search(query) {
    const results = [];
    const dic = await this.loadDictionary(this.dictionaryURL);
    if(this.dictionary==undefined)
      this.dictionary = dic;

    if (this.is_hangul_char(query)) {
      if(query.length<2) return results;

      for (let id = 0; id < dic.length; id++) {
        const Korean = dic[id].kor;
        // console.warn(Korean);
        if(Korean==undefined) continue;

        const ranges = Hangul.rangeSearch(Korean, query);

        if (ranges.length > 0 && dic[id].eng != 'NULL') {
          results.push({ id, Korean, English: dic[id].eng, ranges });
        }
      }

    } else {
      // english query
      if(query.length<3) return results;

      for (let id = 0; id < dic.length; id++) {
        const English = dic[id].eng;
        // console.warn(English);
        if(English==undefined) continue;

        const ranges = Hangul.rangeSearch(English, query);
        if (ranges.length > 0 && dic[id].kor != 'NULL') {
          results.push({ id, Korean: dic[id].kor, English, ranges });
        }
      }
    }

    return results;
  }
}

// const Dictionary = {};


// let dictionary = '';

// Dictionary.this.is_hangul_char = function this.is_hangul_char(ch) {
//   c = ch.charCodeAt(0);
//   if (0x1100 <= c && c <= 0x11FF) return true;
//   if (0x3130 <= c && c <= 0x318F) return true;
//   if (0xAC00 <= c && c <= 0xD7A3) return true;
//   return false;
// }

// Dictionary.this.loadDictionary = function this.loadDictionary(url, callback) {
//   if (dictionary != '') return dictionary;

//   request(url, { encoding: 'utf8' }).on('data', (data) => {
//     try {
//       dictionary += data;
//     }
//     catch (error) {
//       console.error(error);
//     }
//   })

//   request(url, { encoding: 'utf8' }).on('complete', (data) => {
//     try {
//       // console.log(data);
//     }
//     catch (error) {
//       console.error('error');
//       console.error(error);
//     }
//     callback();
//   })
// }

// Dictionary.this.search = function this.search(query) {
//   const results = [];

//   if (Dictionary.this.is_hangul_char(query)) {

//     this.loadDictionary(DictionaryURL, function () {
//       // dic = JSON.parse(dictionary);
//       // // console.log(dic.length);
//       // const start = Date.now();

//       // var results;
//       // results = this.search('bas');

//       // console.dir(results, { depth: 5 });
//       // console.log(`time: ${Date.now() - start}`);
//       for (let id = 0; id < dictionary.length; id++) {
//         const Korean = dictionary[id].kor;

//         const ranges = Hangul.rangethis.search(Korean, query);

//         if (ranges.length > 0 && dictionary[id].eng != 'NULL') {
//           results.push({ id, Korean, English: dictionary[id].eng, ranges });
//         }
//       }
//     });


//   } else {
//     // english query

//     this.loadDictionary(DictionaryURL, function () {
//       for (let id = 0; id < dictionary.length; id++) {
//         const English = dictionary[id].eng;

//         const ranges = Hangul.rangethis.search(English, query);
//         if (ranges.length > 0 && dictionary[id].kor != 'NULL') {
//           results.push({ id, Korean: dictionary[id].kor, English, ranges });
//         }
//       }
//     });
//   }
//   return results;
// }

// module.exports = Dictionary;