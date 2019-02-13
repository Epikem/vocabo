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
          "type":"text",
          "analyzer":"analyzer-kor"
        },
        "def":{
          "type":"text",
          "analyzer":"analyzer-eng"
        }
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
    "term":{
      "wordid":"8555"
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
  "query":{
    "term":{
      "wordsize":17
    }
  }
}

GET kengdic/indices?v

DELETE kengdic

GET kengdic