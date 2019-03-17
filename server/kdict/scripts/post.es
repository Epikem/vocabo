PUT nori_sample
{
  "settings": {
    "index": {
      "analysis": {
        "tokenizer": {
          "nori_user_dict": {
            "type": "nori_tokenizer",
            "decompound_mode": "mixed",
            "user_dictionary": "userdict_ko.txt"
          }
        },
        "analyzer": {
          "my_analyzer": {
            "type": "custom",
            "tokenizer": "nori_user_dict"
          }
        }
      }
    }
  }
}

PUT kengdic
{
  "settings":{
    "analysis":{
      "tokenizer":{
        "nori-user-dict":{
          "type":"nori_tokenizer",
          "decompound_mode":"mixed",
          "user_dictionary":"userdict_ko.txt"
        }
      },
      "analyzer":{
        "analyzer-kor":{
          "type":"custom",
          "tokenizer":"nori-user-dict"
        },
        "analyzer-eng":{
          "type":"custom",
          "tokenizer":"standard",
          "filter":[
            "lowercase"
          ]
        }
      }
    }
  },
  "mappings":{
    "logs":{
      "properties":{
        "word":{
          // "type":"text",
          "type": "completion",
          "analyzer":"analyzer-kor"
        },
        "def":{
          // "type":"text",
          "type":"completion",
          "analyzer":"analyzer-eng"
        }
      }
    }
  }
}

PUT kengdic
{
  "settings":{
    "analysis":{
      "filter": {
        "suggest_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 50
        }
      },
      "tokenizer":{
        "nori-user-dict":{
          "type":"nori_tokenizer",
          "decompound_mode":"mixed",
          "user_dictionary":"userdict_ko.txt"
        },
        "jaso_search_tokenizer": {
          "type": "jaso_tokenizer",
          "mistype": true,
          "chosung": false
        },
        "jaso_index_tokenizer": {
          "type": "jaso_tokenizer",
          "mistype": true,
          "chosung": true
        }
        // "jaso_search_tokenizer": {
        //   "type": "nori_tokenizer",
        //   "mistype": true,
        //   "chosung": false
        // },
        // "jaso_index_tokenizer": {
        //   "type": "nori_tokenizer",
        //   "mistype": true,
        //   "chosung": true
        // }
      },
      "analyzer":{
        "analyzer-kor":{
          "type":"custom",
          "tokenizer":"nori-user-dict"
        },
        "analyzer-eng":{
          "type":"custom",
          "tokenizer":"standard",
          "filter":[
            "lowercase"
          ]
        },
        "kor-suggest_search_analyzer": {
          "type": "custom",
          "tokenizer": "jaso_search_tokenizer"
        },
        "kor-suggest_index_analyzer": {
          "type": "custom",
          "tokenizer": "jaso_index_tokenizer",
          "filter": [
            "suggest_filter"
          ]
        }
      }
    }
  },
  "mappings":{
    "logs":{
      "properties":{
        "word":{
          "type":"text",
          "store":true,
          "analyzer":"kor-suggest_index_analyzer",
          "search_analyzer":"kor-suggest_search_analyzer"
        },
        "def":{
          // "type":"text",
          "type":"completion",
          "analyzer":"analyzer-eng"
        }
      }
    }
  }
}


POST kengdic/_search
{
  "suggest":{
    "songsugge9st":{
      "prefix":"crea",
      "completion":{
        "field": "def"
      }
    }
  }
}
GET kengdic

DELETE kengdic

GET kengdic/wordid/216212


DELETE nori_sample

GET nori_sample/_analyze
{
  "analyzer":"my_analyzer",
  "text":"안녕 나는 바보 위들이야."
}

GET nori_sample/_analyze
{
  "analyzer":"my_analyzer",
  "text":"21세기 세종 계획"
}
GET kengdic/_analyze
{
  "analyzer":"analyzer-kor",
  "text":"21세기 세종 계획"
}

GET kengdic/_search?q=wordid:8555

GET kengdic/_search
{
  "query":{
    "match":{
      "word":"크림치약"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "word":"매화"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "word":"미"
    }
  }
}
GET kengdic/_search?q=wordid:64608

GET kengdic/_search
{
  "query":{
    "match":{
      "word":"감자"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "word":"민"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "word":"믽"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "word":"민조"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "word":"민족"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "term":{
      "wordid":"8555"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "term":{
      "wordid":"61996"
    }
  }
}

{
  "settings": {
    "index": {
      "analysis": {
        "filter": {
          "suggest_filter": {
            "type": "edge_ngram",
            "min_gram": 1,
            "max_gram": 50
          }
        },
        "tokenizer": {
          "jaso_search_tokenizer": {
            "type": "jaso_tokenizer",
            "mistype": true,
            "chosung": false
          },
          "jaso_index_tokenizer": {
            "type": "jaso_tokenizer",
            "mistype": true,
            "chosung": true
          }
        },
        "analyzer": {
          "suggest_search_analyzer": {
            "type": "custom",
            "tokenizer": "jaso_search_tokenizer"
          },
          "suggest_index_analyzer": {
            "type": "custom",
            "tokenizer": "jaso_index_tokenizer",
            "filter": [
              "suggest_filter"
            ]
          }
        }
      }
    }
  }
}

GET kengdic/_mapping 

GET kengdic/_search
{
  "query":{
    "match":{
      "word":"야구공"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "word":"사과"
    }
  }
}
GET kengdic/_search
{
  "query":{
    "match":{
      "def":"apple"
    }
  }
}
GET kengdic/_search
{
  "suggest":{
    "suggest1":{
      "prefix":"cra",
      "completion":{
        "field":"def"
      }
    }
  }
}
GET kengdic/_search
{
  "suggest":{
    "suggest1":{
      "prefix":"밟다",
      "completion":{
        "field":"word"
      }
    }
  }
}
GET kengdic/_search
{
  "suggest":{
    "suggest1":{
      "prefix":"발바",
      "completion":{
        "field":"word"
      }
    }
  }
}
GET kengdic/_search
{
  "suggest":{
    "suggest1":{
      "prefix":"밟",
      "completion":{
        "field":"word"
      }
    }
  }
}
GET kengdic/_search
{
  "query":{
    "term":{
      "wordsize":17
    }
  }
}

GET kengdic/indices?v

DELETE kengdic

GET kengdic