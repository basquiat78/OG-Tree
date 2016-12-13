<a name="Doosan"></a>

## Doosan
**Kind**: global class  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [Doosan](#Doosan)
    * [new Doosan()](#new_Doosan_new)
    * [.tree](#Doosan+tree) : <code>Tree</code>
    * [.aras](#Doosan+aras) : <code>Aras</code>
    * [.mode](#Doosan+mode) : <code>string</code>
    * [.init()](#Doosan+init)
    * [.bindSelectBoxEvent()](#Doosan+bindSelectBoxEvent)
    * [.renderSelectBox(data)](#Doosan+renderSelectBox)
    * [.renderOtherWorkFlowBox(data)](#Doosan+renderOtherWorkFlowBox)
    * [.appendSelectBoxElement(element, label, value)](#Doosan+appendSelectBoxElement)
    * [.renderHeaders(headerItem, myOther)](#Doosan+renderHeaders)
    * [.renderStateBox()](#Doosan+renderStateBox)
    * [.renderSampleData()](#Doosan+renderSampleData)
    * [.renderRandomData()](#Doosan+renderRandomData)
    * [.randomData(type)](#Doosan+randomData) ⇒ <code>Array</code>

<a name="new_Doosan_new"></a>

--------------------------------------------------------------------------------
### new Doosan()
Doosan html view Handler

<a name="Doosan+tree"></a>

--------------------------------------------------------------------------------
### doosan.tree : <code>Tree</code>
OG-Tree 클래스

**Kind**: instance property of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+aras"></a>

--------------------------------------------------------------------------------
### doosan.aras : <code>Aras</code>
Aras 클래스

**Kind**: instance property of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+mode"></a>

--------------------------------------------------------------------------------
### doosan.mode : <code>string</code>
Dev 모드

**Kind**: instance property of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+init"></a>

--------------------------------------------------------------------------------
### doosan.init()
Html 페이지가 처음 로딩되었을 때 오픈그래프 트리를 활성화하고, 필요한 데이터를 인티그레이션 한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+bindSelectBoxEvent"></a>

--------------------------------------------------------------------------------
### doosan.bindSelectBoxEvent()
discipline, disciplineSpec, bg, 아더 워크플로우 셀렉트 박스 이벤트를 등록한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+renderSelectBox"></a>

--------------------------------------------------------------------------------
### doosan.renderSelectBox(data)
주어진 데이터로 discipline, disciplineSpec, bg 셀렉트 박스를 구성한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  

| Param | Description |
| --- | --- |
| data | json |

<a name="Doosan+renderOtherWorkFlowBox"></a>

--------------------------------------------------------------------------------
### doosan.renderOtherWorkFlowBox(data)
주어진 데이터로 아더 워크플로우 셀렉트 박스를 구성한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  

| Param | Description |
| --- | --- |
| data | json |

<a name="Doosan+appendSelectBoxElement"></a>

--------------------------------------------------------------------------------
### doosan.appendSelectBoxElement(element, label, value)
주어진 데이터로 셀렉트 박스 내부에 option 을 생성한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  

| Param | Description |
| --- | --- |
| element | 셀렉트 박스 Dom element |
| label | option display value |
| value | option value |

<a name="Doosan+renderHeaders"></a>

--------------------------------------------------------------------------------
### doosan.renderHeaders(headerItem, myOther)
Html 페이지의 헤더 부분에 프로젝트 정보를 표기한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  

| Param |
| --- |
| headerItem |
| myOther |

<a name="Doosan+renderStateBox"></a>

--------------------------------------------------------------------------------
### doosan.renderStateBox()
doosan/state.json 에 저장된 스테이터스 데이터를 불러와 스테이터스 박스를 구성한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+renderSampleData"></a>

--------------------------------------------------------------------------------
### doosan.renderSampleData()
Dev 모드일시 개발용 샘플 데이터를 오픈그래프 트리에 반영한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+renderRandomData"></a>

--------------------------------------------------------------------------------
### doosan.renderRandomData()
Dev 모드일시 랜덤 데이터를 오픈그래프 트리에 반영한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  
<a name="Doosan+randomData"></a>

--------------------------------------------------------------------------------
### doosan.randomData(type) ⇒ <code>Array</code>
오픈그래프 트리 데이터를 랜덤하게 생성한다.

**Kind**: instance method of <code>[Doosan](#Doosan)</code>  
**Returns**: <code>Array</code> - json  

| Param | Description |
| --- | --- |
| type | other,my |
