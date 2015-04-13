var data = {
    "Articles and Reports": [
        "Articles Home (landing HUB)",
        "Tv Articles",
        "Radio Articles",
        "Online Articles",
        "Audience Articles",
        "Genre Articles",
        "Regular Articles"
    ],
    "The Audience": [
        "Audience Home (landing HUB)",
        "Audience Feedback",
        "Best/Worst reached – TV",
        "Best/Worst reached – Radio",
        "Best/Worst reached – Online",
        "Best/Worst reached – by Genre",
        "Audience Articles",
        "Audience Insights",
        "Audience Trends"
    ],
    "TV": [
        "TV Home (landing HUB)",
        "BBC One",
        "BBC Two",
        "BBC Three",
        "BBC Four",
        "BBC News",
        "BBC Parliament",
        "BBC Alba",
        "CBBC",
        "CBeebies",
        "Daytime TV",
        "Competitors",
        "iPlayer",
        "Red Button",
        "Smart TV",
        "TV Trends",
        "TV Insight"
    ],
    "Radio": [
        "Radio 1",
        "1Xtra",
        "Radio 2",
        "Radio 3",
        "Radio 4",
        "4Xtra",
        "5Live",
        "5Live Sports Extra",
        "6Music",
        "Asian Network",
        "World Service",
        "Radio Scotland",
        "Radio Nan Gaidheld",
        "Radio Ulster",
        "Radio Foyle",
        "Radio Wales",
        "Radio Cymru",
        "Local Radio",
        "Competitors",
        "iPlayerRadio",
        "DAB",
        "Radio Trends",
        "Radio Insight"
    ],
    "Online and Apps": [
        "Homepage",
        "Search",
        "News",
        "Sport",
        "Weather",
        "TV & iPlayer",
        "Radio & Music",
        "Knowledge & Learning",
        "CBeebies",
        "CBBC",
        "Mobile & Tablet",
        "Apps & Games",
        "Online Trends",
        "Online Insight"
    ],
    "News": [
        "UK",
        "World",
        "Local",
        "Local News programmes",
        "News on TV",
        "News 24",
        "News on Radio",
        "News Online",
        "News Trends",
        "News Insight"
    ],
    "Childrens": [
        "CBeebies",
        "CBBC",
        "Bitesize",
        "Learning",
        "Schools",
        "Education",
        "Children's Insight",
        "Children's Trends"
    ],
    "Sport": [
        "World Cup 2014",
        "Commonweath Games",
        "Football",
        "Formula 1",
        "Cricket",
        "Rugby U",
        "Rugby L",
        "Tennis",
        "Golf",
        "Athletics",
        "More Sports",
        "Other Sport Genres",
        "Sport Insight",
        "Sport Trends"
    ],
    "More Genres": [
        "Drama",
        "Comedy",
        "Entertainment",
        "Music",
        "Religion & Ethics",
        "Weather",
        "Learning",
        "Factual",
        "Youth"
    ],
    "Nations and Regions": [
        "English Regions",
        "Northern Island",
        "Scotland",
        "Wales",
        "Local Radio",
        "TV - 6.30s"
    ],
    "Brand Measurement": [
        "TV Channels",
        "Radio Stations",
        "Online",
        "BBC Departments/Genres",
        "CBT",
        "MarComms",
        "BrandWatch",
        "Ad Hoc",
        "Brand Articles",
        "Brand Insights"
    ],
    "Trends": [
        "Tv Trends",
        "Radio Trends",
        "Online Trends",
        "Device Trends",
        "Audience Trends",
        "Genre Trends"
    ]
};

var objectKeys = hashToUrl(data);

function nameToUrl(name) {
    return name.replace(/ /g, "-").replace(/^A-Za-z0-9-/g, "").toLowerCase()
}

function hashToUrl(list) {
    var lookup = {};
    Object.keys(data).forEach(function (topicName) {
        lookup[nameToUrl(topicName)] = topicName;
    });
    return lookup;
}

function setGlobalTopic(topicNameFromUrl) {
    Object.keys(data).forEach(function (topicName) {
        var topicIsSelected = topicNameFromUrl === topicName ? "selected" : "";
        $('.mainNav').append("<a href='/"
        + nameToUrl(topicName)
        + "' class='" + topicIsSelected + "'>"
        + topicName +
        "</a>");
    });
}

function setSubTopics(arrayOfSubTopics, parentTopic, currentSubTopic) {
    var html = "";
    for (var i = 0; i < arrayOfSubTopics.length; i++) {
        var topicIsSelected = nameToUrl(arrayOfSubTopics[i]) === currentSubTopic ? "selected" : "";
        html += "<a href='/"
        + nameToUrl(parentTopic)
        + '/' + nameToUrl(arrayOfSubTopics[i])
        + "' class='" + topicIsSelected + "'>"
        + arrayOfSubTopics[i]
        + "</a>";
    }
    if ($('.localNav').length == 0) {
        $('.mainNav').after("<div class='localNav placeholder'></div>");
    }
    $('.localNav').html(html);
}

function setFromUrl() {
    var path = window.location.pathname.split('/');
    var globalTopic = path[1];
    var topicNameFromUrl;
    if (typeof (objectKeys[globalTopic]) === "undefined") {
        topicNameFromUrl = "";
        window.history.pushState("unused", "unused", "/");
    } else {
        topicNameFromUrl = objectKeys[globalTopic];
    }
    setGlobalTopic(topicNameFromUrl);
    if (topicNameFromUrl !== ""){
        setSubTopics(data[topicNameFromUrl], topicNameFromUrl, path[2]);
    }
}

$(document).ready(function () {
        setFromUrl();
    }
);