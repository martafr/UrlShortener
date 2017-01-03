package urlshortener.zaratech.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import urlshortener.common.domain.ShortURL;
import urlshortener.common.repository.ClickRepository;
import urlshortener.common.repository.ShortURLRepository;
import urlshortener.zaratech.domain.UrlDetails;
import urlshortener.zaratech.domain.UserAgentDetails;
import net.sf.uadetector.*;
import net.sf.uadetector.service.UADetectorServiceFactory;

@Component
public class HeadersManager {

    private final Logger logger = LoggerFactory.getLogger(HeadersManager.class);

    @Autowired
    protected ShortURLRepository shortURLRepository;

    @Autowired
    protected ClickRepository clickRepository;

    public UrlDetails getDetails(String id) {

        ShortURL url = getUrlDetails(id);
        Long clicks = getClickDetails(id);
        Long visitors = getVisitors(id);
        return new UrlDetails(id, url.getTarget(), url.getCreated(), clicks, visitors);
    }

    public UserAgentDetails getUA(String agentStr) {

        UserAgentStringParser parser = UADetectorServiceFactory.getResourceModuleParser();

        ReadableUserAgent agent = parser.parse(agentStr);

        VersionNumber browserVers = agent.getVersionNumber();
        OperatingSystem os = agent.getOperatingSystem();

        return new UserAgentDetails(agent.getName(), browserVers.toVersionString(), os.getName());
    }

    private ShortURL getUrlDetails(String id) {
        return shortURLRepository.findByKey(id);
    }

    private Long getClickDetails(String id) {
        return clickRepository.clicksByHash(id);
    }

    private Long getVisitors(String id) {
        return clickRepository.visitorsByHash(id);
    }
}